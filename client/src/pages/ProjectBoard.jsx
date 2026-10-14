import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Section } from "../shared/Section";
import BoardHeader from "../components/board/BoardHeader";
import BoardToolbar from "../components/board/BoardToolbar";
import BoardColumn from "../components/board/BoardColumn";
import TaskModal from "../components/board/TaskModal";
import MemberModal from "../components/board/MemberModal";
import { COLUMNS } from "../assets/assets";
import { isOverdue } from "../utils/utils";
import TaskDetailModal from "../components/board/TaskDetailModal";
import {
  addMember,
  closeProject,
} from "../redux/features/projects/projectsSlice";
import {
  addComment,
  addTask,
  deleteTask,
  moveTask,
  updateTask,
} from "../redux/features/tasks/tasksSlice";

const ProjectBoard = () => {
  const [openTaskId, setOpenTaskId] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const activeId = useSelector((state) => state.projects.activeId);
  const project = useSelector((state) =>
    state.projects.items.find((p) => p.id === activeId),
  );
  const allTasks = useSelector((state) => state.tasks.items);

  const [modal, setModal] = useState(null); // "task" | "member" | null
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState("all");
  const [mineOnly, setMineOnly] = useState(false);

  const tasks = useMemo(
    () => allTasks.filter((t) => t.projectId === activeId),
    [allTasks, activeId],
  );

  if (!project) return null;

  const me = user?.name || user?.email?.split("@")[0] || "User";
  const isOwner = project.members[0] === me;

  // Stats use ALL tasks, filters only affect the columns
  const stats = {
    total: tasks.length,
    progress: tasks.filter((t) => t.status === "progress").length,
    done: tasks.filter((t) => t.status === "done").length,
    overdue: tasks.filter(isOverdue).length,
  };
  const percent = stats.total
    ? Math.round((stats.done / stats.total) * 100)
    : 0;

  const isFiltering = Boolean(query.trim()) || priority !== "all" || mineOnly;
  const visibleTasks = tasks.filter((t) => {
    if (priority !== "all" && t.priority !== priority) return false;
    if (mineOnly && t.assignee !== me) return false;
    const q = query.trim().toLowerCase();
    if (q && !`${t.title} ${t.description}`.toLowerCase().includes(q))
      return false;
    return true;
  });

  const closeModal = () => setModal(null);

  const handleAddTask = (values) => {
    dispatch(addTask({ projectId: project.id, ...values }));
    closeModal();
  };

  const handleAddMember = (name) => {
    dispatch(addMember({ projectId: project.id, name }));
    closeModal();
  };

  const handleMove = (id, status) => dispatch(moveTask({ id, status }));
  const openTask = tasks.find((t) => t.id === openTaskId);
  const hasModal = Boolean(modal || openTask);

  // Lock page scroll while any modal is open
  useEffect(() => {
    if (!hasModal) return;

    const { body, documentElement } = document;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`; // stops the page shifting sideways

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
    };
  }, [hasModal]);

  if (!project) return null;

  return (
    <>
      {/* Own top padding so the header clears the fixed navbar */}
      <div className="pt-24 px-2 max-w-325 mx-auto">
        <BoardHeader
          project={project}
          isOwner={isOwner}
          stats={stats}
          percent={percent}
          onBack={() => dispatch(closeProject())}
          onAddTask={() => setModal("task")}
          onAddMember={() => setModal("member")}
        />

        <Section id="board" className="px-4">
          <BoardToolbar
            query={query}
            onQuery={setQuery}
            priority={priority}
            onPriority={setPriority}
            mineOnly={mineOnly}
            onMineOnly={setMineOnly}
          />

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {COLUMNS.map((column) => (
              <BoardColumn
                key={column.key}
                column={column}
                tasks={visibleTasks.filter((t) => t.status === column.key)}
                isFiltering={isFiltering}
                onAdd={
                  column.key === "todo" ? () => setModal("task") : undefined
                }
                onOpen={setOpenTaskId}
                onDropTask={handleMove}
                onMove={handleMove}
                onDelete={(id) => dispatch(deleteTask(id))}
              />
            ))}
          </div>
        </Section>
      </div>

      {modal === "task" && (
        <TaskModal
          members={project.members}
          onClose={closeModal}
          onSubmit={handleAddTask}
        />
      )}
      {modal === "member" && (
        <MemberModal onClose={closeModal} onSubmit={handleAddMember} />
      )}
      {openTask && (
        <TaskDetailModal
          task={openTask}
          members={project.members}
          onClose={() => setOpenTaskId(null)}
          onUpdate={(changes) =>
            dispatch(updateTask({ id: openTask.id, ...changes }))
          }
          onMove={(status) => dispatch(moveTask({ id: openTask.id, status }))}
          onDelete={() => {
            dispatch(deleteTask(openTask.id));
            setOpenTaskId(null);
          }}
          onComment={(text) =>
            dispatch(addComment({ taskId: openTask.id, author: me, text }))
          }
        />
      )}
    </>
  );
};

export default ProjectBoard;
