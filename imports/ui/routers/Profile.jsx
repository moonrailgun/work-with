import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

class ProfileRoute extends React.Component {
  render() {
    return (
      <div>{JSON.stringify(this.props.userInfo)}</div>
    )
  }
}

export default withTracker(({match}) => {
  const userId = match.params.userId;

  return {
    userInfo: userId ? Meteor.users.findOne(userId) : Meteor.user(),
  }
})(ProfileRoute)
