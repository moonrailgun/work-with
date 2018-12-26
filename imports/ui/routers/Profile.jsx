import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

class ProfileRoute extends React.Component {
  render() {
    const {
      allowEdit,
      userInfo,
    } = this.props;

    return (
      <div>
        <span>允许编辑: {JSON.stringify(allowEdit)}</span>
        {JSON.stringify(userInfo)}
      </div>
    )
  }
}

export default withTracker(({match}) => {
  const userId = match.params.userId;

  return {
    allowEdit: userId ? userId === Meteor.userId() : true,
    userInfo: userId ? Meteor.users.findOne(userId) : Meteor.user(),
  }
})(ProfileRoute)
