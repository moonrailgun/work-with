// 添加看板成员modal
import React from 'react';
import styled from 'styled-components';
import { withTracker } from 'meteor/react-meteor-data';

class AddMember extends React.Component {
  render() {
    console.log('this.props.users', this.props.users);

    return (
      <div>
        123, loading: {JSON.stringify(this.props.loading)}
      </div>
    )
  }
}

export default withTracker(() => {
  const allUserHandler = Meteor.subscribe('user.all');

  return {
    loading: !allUserHandler.ready(),
    users: Meteor.users.find().fetch(),
  }
})(AddMember);
