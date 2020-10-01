import React from "react";
import { connect } from "react-redux";
import { clearAllUsersSearch, findManyUsersSearch, setManyUsersSearch } from "../../actions/user_search_actions";
import { selectAllUsersSearch } from "../../selectors/user_search_selectors";
import UserSearchItem from "./user_search_item";

const UserSearchbarComponent = ({ users, findUsers, clearUsers }) => {
  const [name, setName] = React.useState("");

  const search = e => {
    setName(e.target.value);
    findUsers(e.target.value);
  }

  const clearSearch = e => {
    e.preventDefault();
    // clearUsers();
    // setName("");
  }

  return (
    <div className="searchbar">
      <input 
        type="search" 
        placeholder="Search for Users" 
        value={name} 
        onChange={search}
        onBlur={clearSearch}
      />

      { (users && users.length > 0) ? (<ul>{users.map(user => {
        return <UserSearchItem key={user.id} user={user}/>
      })}</ul>) : null }
    </div>
  );
}

// map state to props
const msp = state => {
  return {
    users: Object.values(selectAllUsersSearch(state))
  }
}

// map dispatch to props
const mdp = dispatch => {
  return {
    findUsers: name => dispatch(
      findManyUsersSearch({ name }, setManyUsersSearch)
    ),
    clearUsers: () => dispatch(clearAllUsersSearch()),
  }
}

const UserSearchbar = connect(msp, mdp)(UserSearchbarComponent);

export default UserSearchbar;