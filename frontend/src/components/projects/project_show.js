import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { findOneProject, setOneProject } from "../../actions/project_actions";
import { pushModal } from "../../actions/ui_actions";
import { selectOneProject } from "../../selectors/project_selectors";
import { PROJECT_EDIT_MODAL } from "../../constants/modals";
import { selectCurrentUser } from "../../selectors/user_selectors";
import { selectAllPositions } from "../../selectors/position_selectors";

class ProjectShowComponent extends React.Component {
  componentDidMount() {
    this.props.findProject(this.props.match.params.projectId);
  }

  render() {
    const { project } = this.props;

    return project ? (
      <div className="project">
        <h1>{project.name}</h1>
        <p>{project.description}</p>
        
        <ul>
          <h3>Positions</h3>
          {project.positions.map((p, idx) => {
            return (<li key={idx}>{p.title}</li>);
          })}
        </ul>

        {this.props.currentUser.id === project.owner && <button onClick={() => {
          this.props.pushModal(project);
        }}>
          Edit Project
        </button>}
      </div>
    ) : null;
  }
}

const msp = (state, ownProps) => {
  return {
    project: selectOneProject(ownProps.match.params.projectId, state),
    currentUser: selectCurrentUser(state)
  }
}

const mdp = dispatch => {
  return {
    findProject: projectId => dispatch(findOneProject(projectId, setOneProject)),
    pushModal: project => dispatch(pushModal(PROJECT_EDIT_MODAL, { project }))
  }
}

const ProjectShow = withRouter(connect(msp, mdp)(ProjectShowComponent));

export default ProjectShow;