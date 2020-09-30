import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import LoginModal from "./user_auth/login";
import LogoutModal from "./user_auth/logout";
import SignupModal from "./user_auth/signup";
import UserProfile from "./user/user_profile";
import { connect } from "react-redux";
import { selectCurrentUser } from "../selectors/user_selectors";

const AppComponent = () => {
  return (
    <>
      <header>
        Header
        <ProtectedRoute path="/" component={LogoutModal} />
      </header>
      <div className="main-content">
        <Switch>
          <AuthRoute path="/signup" component={SignupModal} />
          <AuthRoute path="/login" component={LoginModal} />
          <ProtectedRoute path="/:userId" component={UserProfile} />
          <ProtectedRoute exact path="/" component={UserProfile} />
        </Switch>
      </div>
    </>
  );
}

const msp = state => {
  return {
    currentUser: selectCurrentUser(state),
  }
}

const App = connect(msp, null)(AppComponent);

export default App;