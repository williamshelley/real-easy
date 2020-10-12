import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/session_actions";
import { selectCurrentUser } from "../../selectors/user_selectors";
import ProjectCreateButton from "../projects/project_create_button";
import UserSearchbar from "../search/user_search_bar";

const NavbarComponent = ({ logout, currentUser }) => {

  return (
    <nav className="navbar">
      <UserSearchbar />
      <ProjectCreateButton />
      <button>
        <Link to={`/users/${currentUser.id}`}>My Profile</Link>
      </button>
      <button onClick={() => logout()}>Logout</button>

    </nav>
  );
}

const msp = state => {
  return {
    currentUser: selectCurrentUser(state)
  }
}

// map dispatch to props
const mdp = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

const Navbar = connect(msp, mdp)(NavbarComponent);

export default Navbar;