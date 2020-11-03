import React from "react";
import { connect } from "react-redux";
import { editProject, mergeOneProject } from "../../actions/project_actions";
import PositionCreate from "../positions/position_create";
import { selectAllPositions } from "../../selectors/position_selectors";
import uuid from 'react-uuid'
import { popModal } from "../../actions/ui_actions";
import { withRouter } from "react-router-dom";

const _emptyPosition = { title: "", description: "", wage: 0 }

class ProjectEditModalComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: props.project.name,
      description: props.project.description,
      positions: props.project.positions
    }

    this.setName = this.setName.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.setPositions = this.setPositions.bind(this);
  }

  setName(value) {
    this.setState({ name: value });
  }

  setDescription(value) {
    this.setState({ description: value });
  }

  setPositions(value) {
    this.setState({ positions: value });
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.match.params !== this.props.match.params) {
      this.props.popModal();
    }
  }

  render() {
    const { name, description, positions, deletePositions } = this.state;
    const { editProject, project } = this.props;
  
  
    const _addPosition = e => {
      let newPositions = positions;
      newPositions.push(_emptyPosition);
      this.setPositions(newPositions);
    }
  
    const _rmPosition = idx => {
      return e => {
        let newPositions = positions.slice(0, idx).concat(positions.slice(idx + 1));
        this.setPositions(newPositions);
      }
    }

    const _updatePositions = idx => {
      return position => {
        let newPositions = positions;
        newPositions[idx] = position;
        this.setPositions(newPositions);
      }
    }
  
    const _onSubmit = () => {
      let filteredPositions = [];
      positions.forEach(pos => {
        if (pos.id || (pos.title && pos.description && pos.wage > 0)) {
          pos.project = project.id;
          filteredPositions.push(pos);
        }
      });

      // debugger;
      editProject({ id: project.id, name, description, positions: filteredPositions });
    }

    const positionsList = () => {
      let timer = null;
      return (
        <>
        { positions.map((pos, idx) => {
            return (
              <PositionCreate 
                key={uuid()} 
                deletePositions={deletePositions}
                timer={timer}
                position={pos} 
                onRemove={_rmPosition(idx)} 
                updatePositions={_updatePositions(idx)} 
              />
        )})}
        </>
      );
    }

    return project ? (
      <form onSubmit={_onSubmit} className="project-edit">
        <input 
          type="text"
          autoComplete="on"
          placeholder={project.name}
          value={name}
          onChange={e => this.setName(e.target.value)}
        />
  
        <textarea 
          type="text"
          autoComplete="on"
          placeholder={project.description}
          value={description}
          onChange={e => this.setDescription(e.target.value)}
        />
  
        <ul>
          <h3>Positions</h3>
          { positionsList() }
        </ul>
        
        <button type="button" onClick={_addPosition}>Add Position</button>
  
        <input type="submit" value="Edit Project" />
  
      </form>
    ) : null;
  }
}

const msp = (state, ownProps) => {
  return {
    positions: Object.values(selectAllPositions(state))
  }
}

const mdp = dispatch => {
  return {
    editProject: project => dispatch(editProject(project, mergeOneProject)),
    popModal: () => dispatch(popModal())
  }
}

const ProjectEditModal = withRouter(connect(msp, mdp)(ProjectEditModalComponent));
export default ProjectEditModal;