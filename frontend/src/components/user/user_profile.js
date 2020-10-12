import React from "react";
import { connect } from "react-redux";
import { clearPositions, findUserPositions, setManyPositions } from "../../actions/position_actions";
import { clearProjects, findManyUserProjects, setManyProjects } from "../../actions/project_actions";
import { findOneUser, setFocusedUser } from "../../actions/user_actions";
import { selectAllPositions } from "../../selectors/position_selectors";
import { selectAllProjects } from "../../selectors/project_selectors";
import { selectCurrentUser, selectFocusedUser } from "../../selectors/user_selectors";

class UserProfileComponent extends React.Component {

  constructor(props) {
    super(props);
    this.currentUserSetup = this.currentUserSetup.bind(this);
    this.newUserSetup = this.newUserSetup.bind(this);
  }

  currentUserSetup() {
    const { currentUser } = this.props;
    // this.props.clear();
    this.props.findUserProjects(currentUser.id).then(() => {
      this.props.findUserPositions(currentUser.id).then(() => {
        this.props.setFocusedUser(currentUser);
      });
    });
  }

  newUserSetup(ownerId) {
    // this.props.clear();
    this.props.findUserProjects(ownerId).then(() => {
      this.props.findUserPositions(ownerId).then(() => {
        this.props.findUser(ownerId);
      });
    });
  }

  componentDidMount() {
    // this.props.clear();
    const { currentUser, ownerId } = this.props;
    if (currentUser && ownerId && currentUser.id !== ownerId) {
      // if user is not current user, fetch data from db
      this.newUserSetup(ownerId);
    } else {
      // if user is current user, use data from state
      this.currentUserSetup();
    }
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    const { currentUser, ownerId } = this.props;
    const newOwnerId = newProps.ownerId;
    
    if (ownerId && newOwnerId && ownerId !== newOwnerId) {
      // this.props.clear();
      if (newOwnerId=== currentUser.id) {
        // if user is the currentUser.then(() => {
        this.currentUserSetup();

      } else if (false) {
        // if user is somewhere in users already
      } else {
        // fetch user data from id
        this.newUserSetup(newOwnerId);
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

        <section className="projects-list">
          <h3>Projects</h3>
          {
            this.props.projects.length > 0 && this.props.projects.map(pro => {
              return (
                <div key={pro.id} className="project">
                  <h3>{pro.name}</h3>
                  <p>{pro.description}</p>
                </div>
              )
            })
          }
        </section>

        <section className="positions-list">
          <h3>Positions</h3>
          {
            this.props.positions.length > 0 && this.props.positions.map(pos => {
              return (
                <div key={pos.id} className="position">
                  <h3>{pos.title}</h3>
                  <p>{pos.description}</p>
                  <p>${pos.wage}</p>
                </div>
              );
            })
          }
        </section>
      </div>
    ) : null;
  }
}

const msp = (state, ownProps) => {
  return {
    ownerId: ownProps.match.params.userId,
    projects: Object.values(selectAllProjects(state)),
    positions: Object.values(selectAllPositions(state)),
    focusedUser: selectFocusedUser(state),
    currentUser: selectCurrentUser(state),
  };
};

const mdp = dispatch => {
  return {
    setFocusedUser: user => dispatch(setFocusedUser(user)),
    findUserProjects: userId => dispatch(findManyUserProjects(userId, setManyProjects)),
    findUser: id => dispatch(findOneUser(id, setFocusedUser)),
    findUserPositions: userId => dispatch(findUserPositions(userId, setManyPositions)),
    clear: () => {
      dispatch(clearPositions());
      dispatch(clearProjects());
    }
  }
};

const UserProfile = connect(msp, mdp)(UserProfileComponent);

export default UserProfile;