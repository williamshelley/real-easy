import React, { useState } from "react";
import { connect } from "react-redux";

const ProjectEditModalComponent = ({ project }) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  
  return project ? (
    <form className="project-edit">
      <input 
        type="text"
        autoComplete="on"
        placeholder={project.name}
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <textarea 
        type="text"
        autoComplete="on"
        placeholder={project.description}
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <input type="submit" value="Edit Project" />

      <p>Add Positions Placeholder</p>
    </form>
  ) : <div>Emtpy</div>;
};

const msp = (state, ownProps) => {
  return {

  }
}

const mdp = dispatch => {
  return {

  }
}

const ProjectEditModal = connect(msp, mdp)(ProjectEditModalComponent);
export default ProjectEditModal;