import React from "react";
import { connect } from "react-redux";
import { findSetUsers } from "../../actions/user_actions";
import { selectAllUsers } from "../../selectors/user_selectors";
import UserSearchItem from "./user_search_item";

const UserSearchbarComponent = ({ users, findUsers }) => {
  const [name, setName] = React.useState("");

  const search = e => {
    setName(e.target.value);
    findUsers(e.target.value);
  }

  return (
    <div className="searchbar">
      <input 
        type="search" 
        placeholder="Search for Users" 
        value={name} 
        onChange={search}
      />

      { (users && users.length > 0) ? (<ul>{users.map(user => {
        return <UserSearchItem key={user.id} user={user}/>
      })}</ul>) : null }
    </div>
  );
}

const msp = state => {
  return {
    users: Object.values(selectAllUsers(state))
  }
}

// map dispatch to props
const mdp = dispatch => {
  return {
    findUsers: name => dispatch(findSetUsers({ name })),
  }
}

const UserSearchbar = connect(msp, mdp)(UserSearchbarComponent);

export default UserSearchbar;