import { createSlice, nanoid } from "@reduxjs/toolkit";
import { deleteProject } from "../projects/projectsSlice";

const STORAGE_KEY = "tasks";

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

const save = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
};

const EDITABLE = ["title", "description", "priority", "dueDate", "assignee"];

const tasksSlice = createSlice({
  name: "tasks",
  initialState: { items: load() },
  reducers: {
    addTask: {
      reducer(state, action) {
        state.items.unshift(action.payload);
        save(state.items);
      },
      prepare({ projectId, title, description, priority, assignee, dueDate }) {
        return {
          payload: {
            id: nanoid(),
            projectId,
            title,
            description,
            priority,
            assignee,
            dueDate: dueDate || null,
            comments: [],
            status: "todo", // todo | progress | done
            createdAt: new Date().toISOString(),
          },
        };
      },
    },
    updateTask(state, { payload }) {
      const task = state.items.find((t) => t.id === payload.id);
      if (!task) return;
      EDITABLE.forEach((key) => {
        if (key in payload) task[key] = payload[key];
      });
      save(state.items);
    },
    moveTask(state, { payload }) {
      const task = state.items.find((t) => t.id === payload.id);
      if (task && task.status !== payload.status) {
        task.status = payload.status;
        save(state.items);
      }
    },
    deleteTask(state, { payload: id }) {
      state.items = state.items.filter((t) => t.id !== id);
      save(state.items);
    },
    addComment: {
      reducer(state, { payload }) {
        const task = state.items.find((t) => t.id === payload.taskId);
        if (!task) return;
        task.comments = task.comments || [];
        task.comments.push(payload.comment);
        save(state.items);
      },
      prepare({ taskId, author, text }) {
        return {
          payload: {
            taskId,
            comment: {
              id: nanoid(),
              author,
              text,
              createdAt: new Date().toISOString(),
            },
          },
        };
      },
    },
  },
  extraReducers: (builder) => {
    // Remove a project's tasks when the project is deleted
    builder.addCase(deleteProject, (state, { payload: projectId }) => {
      state.items = state.items.filter((t) => t.projectId !== projectId);
      save(state.items);
    });
  },
});

export const { addTask, updateTask, moveTask, deleteTask, addComment } =
  tasksSlice.actions;
export default tasksSlice.reducer;