export const selectOneProject = (id, state) => {
  return state.entities.projects[id];
}

export const selectAllProjects = state => {
  return state.entities.projects;
}