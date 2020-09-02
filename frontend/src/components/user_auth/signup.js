import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { signup } from "../../actions/session_actions";

const SignupComponent = ({ signup, history }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [name, setName] = React.useState("");
  const [birthDate, setBirthDate] = React.useState(new Date());

  const _onSubmit = function(event) {
    event.preventDefault();
    signup({ email, password, password2, name, birthDate });
  }

  return (
    <form onSubmit={_onSubmit}>
      <input 
        type="text"
        placeholder="Name" 
        value={name} 
        onChange={e => setName(e.target.value)}
      />

      <input 
        type="date"
        placeholder="Birthday" 
        value={birthDate} 
        onChange={e => setBirthDate(e.target.value)}
      />

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

      <input 
        type="password"
        placeholder="Confirm password" 
        value={password2} 
        onChange={e => setPassword2(e.target.value)}
      />
      
      <input type="submit" value="Login"></input>

      <div className="inline-button">
        <p>Already have account?</p>
        <button onClick={() => history.push("/login")}>Login</button>
      </div>
    </form>
  );
}

// map dispatch to props
const mdp = dispatch => {
  return {
    signup: user => dispatch(signup(user))
  }
}

const SignupModal = withRouter(connect(null, mdp)(SignupComponent));

export default SignupModal;