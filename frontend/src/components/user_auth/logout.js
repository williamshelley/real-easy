import React from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";

const LogoutComponent = ({ logout }) => {
  return (
    <div>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}

// map dispatch to props
const mdp = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

const LogoutModal = connect(null, mdp)(LogoutComponent);

export default LogoutModal;