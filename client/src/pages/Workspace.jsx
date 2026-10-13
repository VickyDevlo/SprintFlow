import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FolderOpen, Plus, Search } from "lucide-react";
import { ProjectCard } from "../shared/ProjectCard";
import { ProjectModal } from "../shared/ProjectModal";
import ProjectBoard from "./ProjectBoard";
import {
  addProject,
  deleteProject,
  updateProject,
  openProject,
  closeProject,
} from "../redux/features/projects/projectsSlice";
import { Section } from "../shared/Section";
import { getGreeting, today } from "../utils/Greeting";

const Workspace = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const projects = useSelector((state) => state.projects.items);
  const activeId = useSelector((state) => state.projects.activeId);

  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(null);

  const owner = user?.name || user?.email?.split("@")[0] || "User";

  // State -> URL
  useEffect(() => {
    const target = activeId ? `/workspace/${activeId}` : "/workspace";
    const { pathname } = window.location;
    if (pathname === target) return;

    // Entering /workspace from "/" replaces the entry, so Back never lands on a stale "/"
    const inWorkspace = pathname.startsWith("/workspace");
    window.history[inWorkspace ? "pushState" : "replaceState"](null, "", target);
  }, [activeId]);

  // URL -> state (browser Back / Forward)
  useEffect(() => {
    const handlePopState = () => {
      const id = window.location.pathname.match(/^\/workspace\/([^/]+)/)?.[1];
      if (id && projects.some((p) => p.id === id)) {
        dispatch(openProject(id));
      } else {
        dispatch(closeProject());
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [dispatch, projects]);

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const handleSubmit = (values) => {
    if (modal.project) {
      dispatch(updateProject({ id: modal.project.id, ...values }));
    } else {
      dispatch(addProject({ ...values, owner }));
    }
    setModal(null);
  };

  const openCreate = () => setModal({ project: null });

  // Must come after ALL hooks
  if (activeId) return <ProjectBoard />;

  return (
    <>
      <Section id="workspace" className="px-4 pt-28">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted">
              {today}
            </p>
            <h1 className="mt-2 font-heading text-3xl font-bold text-text md:text-5xl">
              {getGreeting()},{" "}
              <span className="capitalize text-lime">{owner}</span>
            </h1>
            <p className="mt-2 text-sm text-muted">
              Plan sprints, track progress and ship with your team
            </p>
          </div>
          <button
            type="button"
            onClick={openCreate}
            className="group flex cursor-pointer items-center justify-center gap-2 rounded-full bg-lime px-6 py-3 font-bold text-bg transition hover:brightness-110"
          >
            <Plus
              size={18}
              className="transition-transform duration-300 group-hover:rotate-90"
            />
            New Project
          </button>
        </div>

        {projects.length === 0 ? (
          /* Empty state */
          <button
            type="button"
            onClick={openCreate}
            className="group mt-10 flex w-full cursor-pointer flex-col items-center rounded-3xl border-2 border-dashed border-border/60 px-6 py-20 text-center transition hover:border-lime/50 hover:bg-lime/5"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-br from-gold to-coral text-black transition-transform duration-300 group-hover:scale-105">
              <FolderOpen size={34} />
            </span>
            <h2 className="mt-6 font-heading text-xl font-bold text-text md:text-2xl">
              Your workspace is empty
            </h2>
            <p className="mt-2 max-w-sm text-sm text-muted">
              Start your first sprint by creating a project and inviting your
              team
            </p>
            <span className="mt-6 rounded-full bg-lime px-6 py-2.5 text-sm font-bold text-bg">
              Create your first project
            </span>
          </button>
        ) : (
          <>
            {/* Toolbar */}
            <div className="mt-8 flex flex-col gap-3 border-b border-border/60 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-xs">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects..."
                  aria-label="Search projects"
                  className="w-full rounded-full border border-border/60 bg-surface/60 py-2.5 pl-10 pr-4 text-sm text-text placeholder:text-muted focus:border-lime focus:outline-none"
                />
              </div>

              <p className="text-sm text-muted">
                {filtered.length} of {projects.length}
              </p>
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
              <p className="py-20 text-center text-muted">
                No projects match "{query}"
              </p>
            ) : (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onOpen={(id) => dispatch(openProject(id))}
                    onEdit={(p) => setModal({ project: p })}
                    onDelete={(id) => dispatch(deleteProject(id))}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </Section>

      {modal && (
        <ProjectModal
          project={modal.project}
          onClose={() => setModal(null)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default Workspace;