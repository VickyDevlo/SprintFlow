import { createSlice, nanoid } from "@reduxjs/toolkit";
import { logout } from "../auth/authSlice";

const STORAGE_KEY = "projects";

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

const items = load();

// If the URL is /workspace/<id> and that project exists, open its board on load
const idFromUrl = window.location.pathname.match(/^\/workspace\/([^/]+)/)?.[1];

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    items,
    activeId: items.some((p) => p.id === idFromUrl) ? idFromUrl : null,
  },
  reducers: {
    addProject: {
      reducer(state, action) {
        state.items.unshift(action.payload);
        save(state.items);
      },
      prepare({ name, description, owner }) {
        return {
          payload: {
            id: nanoid(),
            name,
            description,
            members: [owner],
            createdAt: new Date().toISOString(),
          },
        };
      },
    },
    updateProject(state, { payload }) {
      const project = state.items.find((p) => p.id === payload.id);
      if (project) {
        project.name = payload.name;
        project.description = payload.description;
        save(state.items);
      }
    },
    deleteProject(state, { payload: id }) {
      state.items = state.items.filter((p) => p.id !== id);
      if (state.activeId === id) state.activeId = null;
      save(state.items);
    },
    addMember(state, { payload }) {
      const project = state.items.find((p) => p.id === payload.projectId);
      const name = payload.name.trim();
      if (!project || !name) return;
      const exists = project.members.some(
        (m) => m.toLowerCase() === name.toLowerCase(),
      );
      if (!exists) {
        project.members.push(name);
        save(state.items);
      }
    },
    openProject(state, { payload: id }) {
      state.activeId = id;
    },
    closeProject(state) {
      state.activeId = null;
    },
  },
  extraReducers: (builder) => {
    // Don't carry an open board over to the next login
    builder.addCase(logout, (state) => {
      state.activeId = null;
    });
  },
});

export const {
  addProject,
  updateProject,
  deleteProject,
  addMember,
  openProject,
  closeProject,
} = projectsSlice.actions;
export default projectsSlice.reducer;