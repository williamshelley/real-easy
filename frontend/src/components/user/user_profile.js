import React from "react";
import { connect } from "react-redux";
import { findOneUser, setFocusedUser } from "../../actions/user_actions";
import { selectCurrentUser, selectFocusedUser } from "../../selectors/user_selectors";

class UserProfileComponent extends React.Component {

  setUser(user) {

  }

  componentDidMount() {
    const { currentUser, ownerId } = this.props;
    if (currentUser && ownerId && currentUser.id !== ownerId) {
      // if user is not current user, fetch data from db
      this.props.findUser(ownerId);
    } else {
      // if user is current user, use data from state
      this.props.setFocusedUser(currentUser);
    }
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    const { currentUser, ownerId } = this.props;
    // const newOwner = newProps.profileOwner;
    const newOwnerId = newProps.ownerId;
    
    // console.log(newOwner, currentUser);
    // const isNew = newOwner && profileOwner && profileOwner.id !== newOwner.id;

    if (ownerId && newOwnerId && ownerId !== newOwnerId) {
      if (newOwnerId=== currentUser.id) {
        // if user is the currentUser
        this.props.setFocusedUser(currentUser);
      } else if (false) {
        // if user is somewhere in users already
      } else {
        // fetch user data from id
        this.props.findUser(newOwnerId)
      }
    }
  }

  render() {
    const { focusedUser } = this.props;

    // console.log(focusedUser);

    const capitalized = accountType => {
      return accountType[0].toUpperCase() + accountType.toLowerCase().slice(1);
    }

    return focusedUser ? (
      <div className="profile">
        <header>
          <h2>{focusedUser.name} - {capitalized(focusedUser.accountType)}</h2>
          <p>Born on {focusedUser.birthDate}</p>
        </header>

        <section>
          <h3>Hello! This is a placeholder for user information.</h3>
        </section>
      </div>
    ) : null;
  }
}

const msp = (state, ownProps) => {
  return {
    ownerId: ownProps.match.params.userId,
    focusedUser: selectFocusedUser(state),
    currentUser: selectCurrentUser(state),
  };
};

const mdp = dispatch => {
  return {
    setFocusedUser: user => dispatch(setFocusedUser(user)),
    findUser: id => dispatch(findOneUser(id, setFocusedUser))
  }
};

const UserProfile = connect(msp, mdp)(UserProfileComponent);

export default UserProfile;