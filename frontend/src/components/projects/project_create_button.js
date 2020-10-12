import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentUser } from "../../selectors/user_selectors";
const { CLIENT } = require("../../../../backend/constants/user-auth-constants");

const ProjectCreateButtonComponent = ({ currentUser }) => {
  return currentUser.accountType === CLIENT ? (
    <button>
      <Link to="/projects/new">New Project</Link>
    </button>
  ) : null;
}

const msp = state => {
  return {
    currentUser: selectCurrentUser(state)
  }
}

const ProjectCreateButton = connect(msp, null)(ProjectCreateButtonComponent);

export default ProjectCreateButton;