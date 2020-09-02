import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import LoginModal from "./user_auth/login";
import LogoutModal from "./user_auth/logout";

const App = () => {
  return (
    <>
      <header>Header</header>
      <div className="main-content">
        <Switch>
          <AuthRoute path="/login" component={LoginModal} />
          <ProtectedRoute path="/" component={LogoutModal} />
        </Switch>
      </div>
    </>
  );
}

export default App;