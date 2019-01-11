// 添加看板成员modal
import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { withTracker } from 'meteor/react-meteor-data';

class AddMember extends React.Component {
  render() {
    console.log('this.props.users', this.props.users);

    const suggestions = this.props.users.map(user => {
      return {
        label: user.emails.address,
        value: user._id
      }
    })

    return (
      <div>
        123, loading: {JSON.stringify(this.props.loading)}
        <Select options={suggestions} isClearable />
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
