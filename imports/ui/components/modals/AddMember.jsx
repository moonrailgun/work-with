// 添加看板成员modal
import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/erasaur:meteor-lodash';

const Root = styled.div`
  width: 650px;
  height: 340px;
`

class AddMember extends React.Component {
  render() {
    console.log('this.props.users', this.props.users);

    const suggestions = this.props.users.map(user => {
      return {
        label: _.get(user, 'emails[0].address'),
        value: _.get(user, '_id')
      }
    })

    return (
      <Root>
        <Select
          options={suggestions}
          isClearable
          isMulti
        />
      </Root>
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
