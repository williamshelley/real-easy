import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { findOneProject, setOneProject } from "../../actions/project_actions";
import { selectOneProject } from "../../selectors/project_selectors";

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
      </div>
    ) : null;
  }
}

const msp = (state, ownProps) => {
  return {
    project: selectOneProject(ownProps.match.params.projectId, state)
  }
}

const mdp = dispatch => {
  return {
    findProject: projectId => dispatch(findOneProject(projectId, setOneProject))
  }
}

const ProjectShow = withRouter(connect(msp, mdp)(ProjectShowComponent));

export default ProjectShow;