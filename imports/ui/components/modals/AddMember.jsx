// 添加看板成员modal
import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/erasaur:meteor-lodash';
import theme from '../../utils/theme';

import Button from '@material-ui/core/Button';

const StyledButton = styled(Button)``

const Root = styled.div`
  width: 480px;
  height: 320px;
  text-align: center;
  padding-top: ${theme.spacing.unit * 4}px;

  p {
    margin-top: ${theme.spacing.unit * 2}px;
    margin-bottom: ${theme.spacing.unit * 3}px;
  }

  ${StyledButton} {
    margin-top: ${theme.spacing.unit * 2}px;
    width: 60%;
  }
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
        <img src="/images/new-team.svg" />
        <p>添加其他的成员加入您的看板，能更好的协同工作！</p>
        <Select
          options={suggestions}
          isClearable
          isMulti
        />
        <StyledButton variant="contained" color="primary">添加</StyledButton>
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
