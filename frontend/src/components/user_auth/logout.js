import React from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";

const LogoutComponent = ({ logout }) => {
  return (
    <nav className="navbar">
      <button onClick={() => logout()}>Logout</button>
    </nav>
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