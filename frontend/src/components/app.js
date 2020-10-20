import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import LoginModal from "./user_auth/login";
import Navbar from "./navigation/navbar";
import SignupModal from "./user_auth/signup";
import UserProfile from "./user/user_profile";
import { connect } from "react-redux";
import { selectCurrentUser } from "../selectors/user_selectors";
import ProjectShow from "./projects/project_show";
import ProjectCreate from "./projects/project_create";
import { renderUI } from "../util/ui_util";
import { selectUI } from "../selectors/ui_selector";

const AppComponent = ({ ui }) => {
  return (
    <>
      <ProtectedRoute path="/" component={Navbar} />

      <div className="main-content">
        <header>
          <h1>Real Easy -- Dev</h1>
        </header>

        <Switch>
          <AuthRoute path="/signup" component={SignupModal} />
          <AuthRoute path="/login" component={LoginModal} />
          <ProtectedRoute path="/projects/new" component={ProjectCreate} />
          <ProtectedRoute path="/users/:userId" component={UserProfile} />
          <ProtectedRoute path="/projects/:projectId" component={ProjectShow} />
          <ProtectedRoute exact path="/" component={UserProfile} />
        </Switch>

        { renderUI(ui) }
      </div>
    </>
  );
}

const msp = state => {
  return {
    currentUser: selectCurrentUser(state),
    ui: selectUI(state)
  }
}

const App = connect(msp, null)(AppComponent);

export default App;