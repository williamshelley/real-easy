import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import logoutModal from "./user_auth/logout";
import LoginModal from "./user_auth/login";

const App = () => {
  return (
    <>
      <header>Header</header>
      <div className="main-content">
        <Switch>
          <AuthRoute path="/login" component={LoginModal} />
          <ProtectedRoute path="/" component={logoutModal} />
        </Switch>
      </div>
    </>
  );
}

export default App;