import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { login } from "../../actions/session_actions";

const LoginComponent = ({ login, history }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const _onSubmit = function(event) {
    event.preventDefault();
    login({ email, password });
  }

  return (
    <form onSubmit={_onSubmit} className="login">
      <input 
        type="text"
        placeholder="Email" 
        value={email} 
        onChange={e => setEmail(e.target.value)}
      />

      <input 
        type="password"
        placeholder="Password" 
        value={password} 
        onChange={e => setPassword(e.target.value)}
      />
      
      <input type="submit" value="Login"></input>

      <div className="inline-button">
        <p>Don't have account?</p>
        <button onClick={() => history.push("/signup")}>Signup</button>
      </div>
    </form>
  );
}

// map dispatch to props
const mdp = dispatch => {
  return {
    login: user => dispatch(login(user))
  }
}

const LoginModal = withRouter(connect(null, mdp)(LoginComponent));

export default LoginModal;