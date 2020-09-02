import React from "react";
import { selectCurrentUser } from "../../selectors/user_selectors";
import { logout } from "../../actions/session_actions";
import { withRouter } from "react-router-dom";
import { connect } from "mongoose";

const LOGIN = "Login";
const SIGNUP = "Sign up";
const LOGOUT = "Logout";

const Button = ({ type, onClick }) => {
  return (
    <button className={type} onClick={onClick}>{type}</button>
  );
}

const UserAuthComponent = ({ currentUser, logout, history, location }) => {
  debugger;
  const _navigateTo = destination => {
    return () => {
      history.push(destination);
    }
  }

  const _SignedOutButtons = () => {
    return (location ? 
      (<Button type={LOGIN} action={_navigateTo("/login")} />) 
      : (<Button type={SIGNUP} ction={_navigateTo("/signup")} />)
    );
  }

  return (
    <div className="user-auth-modal">
      { currentUser ? (
        <Button type={LOGOUT} onClick={() => logout()} />
      ) : (
        <_SignedOutButtons />
      )}
    </div>
  );
}

// map state to props
const msp = state => {
  return {
    currentUser: selectCurrentUser(state),
  }
}

// map dispatch to props
const mdp = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

const UserAuthModal = withRouter(connect(msp, mdp)(ContainerComponent));

export default ContainerModal;