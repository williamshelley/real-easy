import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { findOneProject, setOneProject } from "../../actions/project_actions";
import { pushModal } from "../../actions/ui_actions";
import { selectOneProject } from "../../selectors/project_selectors";
import { PROJECT_EDIT_MODAL } from "../../constants/modals";
import { selectCurrentUser } from "../../selectors/user_selectors";
import { setManyRequests, findProjectRequests, acceptOneRequest, mergeOneRequest, declineOneRequest, makeOneRequest, deleteOneRequest, clearOneRequest } from "../../actions/request_actions";
import { selectRequests } from "../../selectors/request_selectors";
import { SERVICE_PROVIDER } from "../../../../backend/constants/user-auth-constants";

class ProjectShowComponent extends React.Component {
  componentDidMount() {
    let { projectId } = this.props.match.params;
    this.props.findProject(projectId)
      .then(() => { this.props.findProjectRequests(projectId)});
  }

  makeNewRequest(positionId) {
    let request = {
      project: this.props.match.params.projectId,
      position: positionId,
      requester: this.props.currentUser.id,
      recipient: this.props.project.owner,
      serviceProvider: this.props.currentUser.id
    };
    this.props.makeRequest(request);
  }

  render() {
    const { project, requests, acceptRequest, declineRequest, currentUser, deleteRequest } = this.props;

    return project ? (
      <div className="project">
        <h1>{project.name}</h1>
        <p>{project.description}</p>
        
        <ul>
          <h3>Positions</h3>
          {project.positions.map((p, idx) => {
            return (<li key={idx}>
              {p.title} -- {p.user ? "Filled" : "Open Position"}
              {currentUser.accountType === SERVICE_PROVIDER && <button onClick={() => this.makeNewRequest(p.id)}>Make Request</button>}
            </li>);
          })}

          <h3>Requests</h3>
          {requests.map((r, idx) => {
            return (<li key={idx + project.positions.length}>
              {r.requester} to {r.recipient} -- {r.status}
              
              {currentUser.id === project.owner && ((r.status === "Pending") || (r.status === "Declined")) && <button onClick={() => acceptRequest(r.id)}>Accept Request</button>}
              {currentUser.id === project.owner && ((r.status === "Pending") || (r.status === "Accepted")) && <button onClick={() => declineRequest(r.id)}>Decline Request</button>}
              {(currentUser.id === project.owner) && <button onClick={() => deleteRequest(r.id)}>Delete Request</button>}
            </li>)
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
    currentUser: selectCurrentUser(state),
    requests: Object.values(selectRequests(state))
  }
}

const mdp = dispatch => {
  return {
    findProject: projectId => dispatch(findOneProject(projectId, setOneProject)),
    pushModal: project => dispatch(pushModal(PROJECT_EDIT_MODAL, { project })),
    findProjectRequests: projectId => dispatch(findProjectRequests(projectId, setManyRequests)),
    acceptRequest: requestId => dispatch(acceptOneRequest(requestId, mergeOneRequest)),
    declineRequest: requestId => dispatch(declineOneRequest(requestId, mergeOneRequest)),
    makeRequest: request => dispatch(makeOneRequest(request, mergeOneRequest)),
    deleteRequest: requestId => dispatch(deleteOneRequest(requestId, clearOneRequest))
  }
}

const ProjectShow = withRouter(connect(msp, mdp)(ProjectShowComponent));

export default ProjectShow;