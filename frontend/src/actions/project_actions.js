import * as API_UTIL from "../util/api/project_api_util";
import { receive } from "./generic_actions";

export const SET_ONE_PROJECT = "SET_ONE_PROJECT";
export const MERGE_ONE_PROJECT = "MERGE_ONE_PROJECT";
export const SET_MANY_PROJECTS = "SET_MANY_PROJECTS";
export const MERGE_MANY_PROJECTS = "MERGE_MANY_PROJECTS";

export const RECEIVE_PROJECT_ERRORS = "RECEIVE_PROJECT_ERRORS";

const ONE_FIELD = "project";
const MANY_FIELD = "projects";
const ERRORS_FIELD = "errors";

const receiveErrors = errors => receive(RECEIVE_PROJECT_ERRORS, ERRORS_FIELD, errors);

const receiveOne = (type, project) => receive(type, ONE_FIELD, project);
export const setOneProject = project => receiveOne(SET_ONE_PROJECT, project);
export const mergeOneProject = project => receiveOne(MERGE_ONE_PROJECT, project);

const receiveMany = (type, projects) => receive(type, MANY_FIELD, projects);
export const setManyProjects = projects => receiveMany(SET_MANY_PROJECTS, projects);
export const mergeManyProjects = projects => receiveMany(MERGE_MANY_PROJECTS, projects);

export const clearProjects = () => receiveMany(SET_MANY_PROJECTS, {});

export const createProject = (project, action) => dispatch => {
  return API_UTIL.postNewProject(project)
    .then(res => {
      return dispatch(action(res.data))
    })
    .catch(errors => dispatch(receiveErrors(errors)));
}

export const findOneProject = (id, action) => dispatch => {
  return API_UTIL.getOneProject(id)
    .then(res => {
      return dispatch(action(res.data));
    })
    .catch(errors => dispatch(receiveErrors(errors)));
}

export const findManyUserProjects = (userId, action) => dispatch => {
  return API_UTIL.getManyUserProjects(userId)
  .then(res => {
    return dispatch(action(res.data));
  })
  .catch(errors => dispatch(receiveErrors(errors)));
}