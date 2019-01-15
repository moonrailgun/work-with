// 添加看板成员modal
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import styled from 'styled-components';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/erasaur:meteor-lodash';
import theme from '../../utils/theme';
import { addMember } from '/imports/api/kanban/methods';
import modalManager from '/imports/ui/utils/modalManager';

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
  state = {
    selectedOption: [],
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }

  handleAdd = () => {
    const kanbanId = this.props.kanbanId;
    const ids = this.state.selectedOption.map(s => s.value);
    console.log('ids', ids);
    addMember.call({kanbanId, members: ids}, (err) => {
      if(err) {
        console.error(err);
      }

      modalManager.closeTop();
    })
  }

  render() {
    const existsMembers = this.props.existsMembers;
    const suggestions = this.props.users
      .filter(user => !existsMembers.includes(user._id))
      .map(user => {
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
          value={this.state.selectedOption}
          onChange={this.handleChange}
          options={suggestions}
          isClearable
          isMulti
        />
        <StyledButton
          variant="contained"
          color="primary"
          onClick={this.handleAdd}
        >添加</StyledButton>
      </Root>
    )
  }
}

AddMember.propTypes = {
  kanbanId: PropTypes.string,
  existsMembers: PropTypes.array,
}

export default withTracker(() => {
  const allUserHandler = Meteor.subscribe('user.all');

  return {
    loading: !allUserHandler.ready(),
    users: Meteor.users.find().fetch(),
  }
})(AddMember);
