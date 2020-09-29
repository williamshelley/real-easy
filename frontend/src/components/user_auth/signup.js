import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { signup } from "../../actions/session_actions";

const { USER_TYPES } = require("../../../../backend/constants/user-auth-constants");

const SignupComponent = ({ signup, history }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [name, setName] = React.useState("");
  const [birthDate, setBirthDate] = React.useState(new Date());
  const [type, setType] = React.useState("");

  const { CLIENT, SERVICE_PROVIDER } = USER_TYPES;
  let client = "Client";
  let serviceProvider = "Service Provider";

  const _onSubmit = function(event) {
    event.preventDefault();
    signup({ email, password, password2, name, birthDate, type });
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

      <select value={type} onChange={e => setType(e.target.value)}>
        <option disabled value={""}>--Select a user type--</option>
        <option value={SERVICE_PROVIDER}>{serviceProvider}</option>
        <option value={CLIENT}>{client}</option>
      </select>

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
      
      <input type="submit" value="Sign Up"></input>

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