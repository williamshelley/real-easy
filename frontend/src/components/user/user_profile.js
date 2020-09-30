import React from "react";
import { connect } from "react-redux";
import { setFocusedUser } from "../../actions/user_actions";
import { selectCurrentUser, selectFocusedUser } from "../../selectors/user_selectors";

class UserProfileComponent extends React.Component {

  componentDidMount() {
    // fetch user
    const { userId } = this.props.match.params;
    const { currentUser } = this.props;
    if (userId && currentUser.id === userId) {
      console.log("should check if user has already been fetched, if not, then fetch user -- user_profile.js");
    } else {
      console.log(`set focused user to ${currentUser.id} user -- user_profile.js`);
      this.props.setFocusedUser(currentUser);
    }
  }

  render() {
    const { profileOwner } = this.props;

    const capitalized = accountType => {
      return accountType[0].toUpperCase() + accountType.toLowerCase().slice(1);
    }

    return profileOwner ? (
      <div className="profile">
        <header>
          <h2>{profileOwner.name} - {capitalized(profileOwner.accountType)}</h2>
          <p>Born on {profileOwner.birthDate}</p>
        </header>

        <section>
          <h3>Hello! This is a placeholder for user information.</h3>
        </section>
      </div>
    ) : null;
  }
}

const msp = state => {
  return {
    profileOwner: selectFocusedUser(state),
    currentUser: selectCurrentUser(state),
  };
};

const mdp = dispatch => {
  return {
    setFocusedUser: user => dispatch(setFocusedUser(user)),
  }
};

const UserProfile = connect(msp, mdp)(UserProfileComponent);

export default UserProfile;