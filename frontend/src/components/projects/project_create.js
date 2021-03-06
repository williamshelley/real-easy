import React, { useState } from "react";
import { connect } from "react-redux";
import { createProject, mergeOneProject } from "../../actions/project_actions";
import { selectCurrentUser } from "../../selectors/user_selectors";

const ProjectCreateComponent = ({ history, currentUser, createProject }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const _onSubmit = function() {
    
    createProject({ owner: currentUser.id, name, description }).then(() => {
      history.push("/");
    });
  }

  return (
    <form onSubmit={_onSubmit} className="project-create">
      <input 
        type="text"
        autoComplete="on"
        placeholder="Project Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <textarea 
        type="text"
        autoComplete="on"
        placeholder="Project Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <input type="submit" value="Create Project" />
    </form>
  );
}

const msp = state => {
  return {
    currentUser: selectCurrentUser(state)
  }
}

const mdp = dispatch => {
  return {
    createProject: project => dispatch(createProject(project, mergeOneProject))
  }
}

const ProjectCreate = connect(msp, mdp)(ProjectCreateComponent);

export default ProjectCreate;