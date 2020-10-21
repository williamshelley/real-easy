import React, { useState } from "react";
import { connect } from "react-redux";

const PositionCreateComponent = ({ position, onRemove, deletePositions }) => {
  const [title, setTitle] = useState(position.title);
  const [description, setDescription] = useState(position.description);
  const [wage, setWage] = useState(position.wage);

  const changeTitle = e => {
    if (position.id) {
      deletePositions.push(position.id);
      delete position.id;
    }
    position.title = e.target.value;
    setTitle(e.target.value);
    // updatePositions({ title: e.target.value, description, wage });
  }

  const changeDescription = e => {
    if (position.id) {
      deletePositions.push(position.id);
      delete position.id;
    }
    position.description = e.target.value;
    setDescription(e.target.value);
    // updatePositions({ title, description: e.target.value, wage});
  }

  const changeWage = e => {
    if (position.id) {
      deletePositions.push(position.id);
      delete position.id;
    }
    position.wage = parseInt(e.target.value);
    setWage(parseInt(e.target.value));
    // updatePositions({ title, description, wage: parseInt(e.target.value) });
  }
  
  return (
    <div className="position-create">
      <input 
        type="text"
        autoComplete="on"
        placeholder="Position Title"
        value={title}
        onChange={changeTitle}
      />

      <textarea 
        type="text"
        autoComplete="on"
        placeholder="Position Description"
        value={description}
        onChange={changeDescription}
      />

      <input 
        type="number"
        autoComplete="on"
        placeholder="Position Title"
        value={wage}
        onChange={changeWage}
      />

      <button type="button" onClick={onRemove}>Remove Position</button>
    </div>
  );
}

const msp = state => {
  return {

  }
}

const mdp = dispatch => {
  return {

  }
}

const PositionCreate = connect(msp, mdp)(PositionCreateComponent);

export default PositionCreate;