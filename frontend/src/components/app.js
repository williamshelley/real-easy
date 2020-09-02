import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch, Route } from "react-router-dom";
import LoginModal from "./user_auth/login";
import LogoutModal from "./user_auth/logout";
import SignupModal from "./user_auth/signup";

const App = () => {
  return (
    <>
      <header>Header</header>
      <div className="main-content">
        <Switch>
          <AuthRoute path="/signup" component={SignupModal} />
          <AuthRoute path="/login" component={LoginModal} />
          <ProtectedRoute exact path="/" component={LogoutModal} />
          {/* <Route path="*" component={} /> */}
        </Switch>
      </div>
    </>
  );
}

export default App;