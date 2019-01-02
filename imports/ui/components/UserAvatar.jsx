import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/erasaur:meteor-lodash';
import { Avatar as AvatarCollection } from '/imports/api/files/avatar';
import styled from 'styled-components';

import Avatar from '@material-ui/core/Avatar';

const UserAvatar = (props) => {
  const {
    avatar,
    size,
  } = props;

  let style = {};
  if(size) {
    style.width = size;
    style.height = size;
  }

  return (
    <Avatar src={avatar} style={style} />
  )
}

UserAvatar.propTypes = {
  userId: PropTypes.string,
}

console.log('UserAvatar', UserAvatar);

export default withTracker(({userId}) => {
  const userInfoHandler = Meteor.subscribe('user.base.info', {userId}); // TODO: 可能需要优化
  const userInfo = userId
    && userInfoHandler.ready()
    && Meteor.users.findOne(userId);
  let avatar;
  let avatarId = _.get(userInfo, 'info.avatar');
  if(avatarId) {
    let avatarInfo = AvatarCollection.findOne(avatarId);
    avatar = avatarInfo && avatarInfo.link()
  }

  return {
    loading: !userInfoHandler.ready(),
    avatar,
  }
})(UserAvatar);
