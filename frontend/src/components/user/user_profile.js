import React from "react";
import { connect } from "react-redux";
import { findMergeOneUser, setFocusedUser } from "../../actions/user_actions";
import { selectCurrentUser, selectFocusedUser, selectUser } from "../../selectors/user_selectors";

class UserProfileComponent extends React.Component {

  setUser(user) {

  }

  componentDidMount() {
    const { userId } = this.props.match.params;
    const { currentUser } = this.props;
    // console.log(currentUser);
    // console.log(userId);
    if (currentUser && userId && currentUser.id !== userId) {
      console.log("should check if user has already been fetched, if not, then fetch user -- user_profile.js");
      this.props.findUser(userId).then(action => {
        this.props.setFocusedUser(action.user);
      });
    } else {
      // console.log(this.props.match);
      this.props.setFocusedUser(currentUser);
    }
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    const { currentUser, profileOwner } = this.props;
    const newOwner = newProps.profileOwner;
    
    if (newOwner && profileOwner && profileOwner.id !== newOwner.id) {
      if (newOwner.id === currentUser.id) {
        // if user is the currentUser
        this.props.setFocusedUser(currentUser);
      } else if (false) {
        // if user is somewhere in users already
      } else {
        // fetch user data from id
        this.props.setFocusedUser(newOwner);
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
  // console.log(selectUser(ownProps.match.params.userId, state));
  return {
    profileOwner: selectUser(ownProps.match.params.userId, state),
    focusedUser: selectFocusedUser(state),
    currentUser: selectCurrentUser(state),
  };
};

const mdp = dispatch => {
  return {
    setFocusedUser: user => dispatch(setFocusedUser(user)),
    findUser: id => dispatch(findMergeOneUser(id))
  }
};

const UserProfile = connect(msp, mdp)(UserProfileComponent);

export default UserProfile;