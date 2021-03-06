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
  const [accountType, setAccountType] = React.useState("");

  const { CLIENT, SERVICE_PROVIDER } = USER_TYPES;
  let client = "Client";
  let serviceProvider = "Service Provider";

  const _onSubmit = function() {
    signup({ email, password, password2, name, birthDate, accountType });
  }

  return (
    <form onSubmit={_onSubmit} className="signup">
      <input 
        type="text"
        autoComplete="on"
        placeholder="Name" 
        value={name} 
        onChange={e => setName(e.target.value)}
      />

      <input 
        type="text"
        autoComplete="on"
        placeholder="Email" 
        value={email} 
        onChange={e => setEmail(e.target.value)}
      />

      <input 
        type="password"
        autoComplete="on"
        placeholder="Password" 
        value={password} 
        onChange={e => setPassword(e.target.value)}
      />

      <input 
        type="password"
        autoComplete="on"
        placeholder="Confirm password" 
        value={password2} 
        onChange={e => setPassword2(e.target.value)}
      />

      <select value={accountType} onChange={e => setAccountType(e.target.value)}>
        <option disabled value={""}>--Select a account type--</option>
        <option value={SERVICE_PROVIDER}>{serviceProvider}</option>
        <option value={CLIENT}>{client}</option>
      </select>

      <input 
        type="date"
        autoComplete="on"
        placeholder="Birthday" 
        value={birthDate} 
        onChange={e => setBirthDate(e.target.value)}
      />
      
      <input type="submit" value="Sign Up" />

      <div className="inline-button">
        <p>Already have account?</p>
        <button type="button" onClick={() => history.push("/login")}>Login</button>
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