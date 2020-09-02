import React from "react";
import { connect } from "react-redux";
import { login } from "../../actions/session_actions";

const LoginComponent = ({ login }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const _onSubmit = function(event) {
    event.preventDefault();
    login({ email, password });
  }

  return (
    <form onSubmit={_onSubmit}>
      <input 
        type="text"
        placeholder="Email" 
        value={email} 
        onChange={e => setEmail(e.target.value)}
      />

      <input 
        type="text"
        placeholder="Password" 
        value={password} 
        onChange={e => setPassword(e.target.value)}
      />
      
      <input type="submit" value="Login"></input>
    </form>
  );
}

// map dispatch to props
const mdp = dispatch => {
  return {
    login: user => dispatch(login(user))
  }
}

const LoginModal = connect(null, mdp)(LoginComponent);

export default LoginModal;