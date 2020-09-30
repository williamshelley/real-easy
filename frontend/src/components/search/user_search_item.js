import React from "react";
import { Link } from "react-router-dom";

const UserSearchItem = ({ user }) => {
  return (
    <Link to={`/users/${user.id}`}>{user.name}</Link>
    // <li onClick={() => }>
    //   {user.name}
    // </li>
  );
}

export default UserSearchItem;