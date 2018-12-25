import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

class UserAvatar extends React.Component {
  render() {
    // TODO
    console.log('[UserAvatar]', this.props.userInfo);
    return (
      <div></div>
    )
  }
}

UserAvatar.propTypes = {
  userId: PropTypes.string,
}

export default withTracker(({userId}) => {
  console.log(Meteor.users);
  return {
    userInfo: userId && Meteor.users.findOne(userId),
  }
})(UserAvatar);
