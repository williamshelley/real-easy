import React, { useState } from "react";
import { connect } from "react-redux";
import { createProject, mergeOneProject } from "../../actions/project_actions";

const ProjectCreateComponent = ({ history, createProject }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [positions, setPositions] = useState([]);

  const _onSubmit = function() {
    createProject({ name, description, positions }).then(() => {
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

      <p>Add Positions Placeholder</p>
    </form>
  );
}

const msp = state => {
  return {
    
  }
}

const mdp = dispatch => {
  return {
    createProject: project => dispatch(createProject(project, mergeOneProject))
  }
}

const ProjectCreate = connect(msp, mdp)(ProjectCreateComponent);

export default ProjectCreate;