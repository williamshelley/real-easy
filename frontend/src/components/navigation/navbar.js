import React from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import UserSearchbar from "../search/user_search_bar";

const NavbarComponent = ({ logout }) => {

  return (
    <nav className="navbar">
      <UserSearchbar />
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

const Navbar = connect(null, mdp)(NavbarComponent);

export default Navbar;