import React, { Fragment } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/erasaur:meteor-lodash';
import styled from 'styled-components';
import UserAvatar from '/imports/ui/components/UserAvatar';
import { Avatar } from '/imports/api/files/avatar';
import { Kanban } from '/imports/api/kanban/kanban';
import { Team } from '/imports/api/team/team';
import { updateInfo } from '/imports/api/users/methods';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const Container = styled(Grid)`
  padding-top: ${props => props.theme.spacing.unit * 2}px;
`

const ProfileCard = styled(Paper)`
  padding: ${props => props.theme.spacing.unit}px;
  margin-bottom: ${props => props.theme.spacing.unit}px;
  overflow: auto;

  h1 {
    margin: ${props => props.theme.spacing.unit}px 0;
    ${props => props.theme.typography.title};
  }
`

const ProfileGrid = styled(Grid).attrs(props => ({
  md: props.fullwidth ? 12 : 6,
  item: true,
  container: true,
}))`
  margin-bottom: ${props => props.theme.spacing.unit}px !important;
`

const ProfileDetail = (props) => {
  const {
    label,
    value,
    fullWidth,
    renderComponent,
    addonComponent,
  } = props;

  return (
    <ProfileGrid fullwidth={fullWidth ? 1 : 0}>
      <span>{__(`profile.${label}`)}:</span>
      {
        renderComponent || <span>{value}</span>
      }
      {addonComponent}
    </ProfileGrid>
  )
}

class ProfileRoute extends React.Component {
  handleShowUpload = () => {
    this.refs.avatarFile && this.refs.avatarFile.click();
  }

  handleUpload = (e) => {
    let files = e.currentTarget.files;
    if(files && files[0]) {
      const file = files[0];
      Avatar.insert({
        file,
        streams: 'dynamic',
        chunkSize: 'dynamic',
        onStart(err, fileData) {
          console.log('开始上传');
        },
        onProgress(progress) {
          console.log('上传进度', progress);
        },
        onError(err, fileData) {
          console.log('上传失败');
        },
        onUploaded(err, fileRef) {
          console.log('上传完毕', fileRef);
          updateInfo.call({
            info: {
              avatar: fileRef._id,
            }
          }, err => err && console.log(err))
        }
      })
    }
  }

  renderSelfProfile() {
    if(!this.props.isSelf) {
      return null;
    }

    return (
      <Fragment>
        <ProfileCard>
          <h1>我的看板</h1>
          <p>个人看板:{JSON.stringify(_.get(this.props, 'kanban.self', []).map(x => x._id))}</p>
          <p>团队看板:{JSON.stringify(_.get(this.props, 'kanban.team', []).map(x => x._id))}</p>
        </ProfileCard>
        <ProfileCard>
          <h1>我的团队</h1>
          <p>团队看板:{JSON.stringify(_.get(this.props, 'team', []).map(x => x._id))}</p>
        </ProfileCard>
      </Fragment>
    )
  }

  renderUserProfile() {
    const userId = this.props.userId;
    const userInfo = this.props.userInfo || {};
    const detailInfo = userInfo.info || {};

    const email = _.get(userInfo, 'emails.0.address');

    return (
      <Grid container>
        <ProfileDetail fullWidth label="avatar" renderComponent={<UserAvatar userId={userId} />} />
        <ProfileDetail label="username" value={email} />
        <ProfileDetail label="email" renderComponent={<a href={`mailto:${email}`}>{email}</a>} />
        <ProfileDetail label="fullname" value={detailInfo.fullname} />
      </Grid>
    )
  }

  render() {
    const {
      allowEdit,
      userInfo,
    } = this.props;

    return (
      <Container
        container
        direction="row"
        justify="center"
      >
        <Grid container item sm={10} spacing={16}>
          <Grid item sm={8}>
            <ProfileCard>
              <h1>用户信息</h1>
              {
                allowEdit && (
                  <Fragment>
                    <Button variant="outlined" color="primary" onClick={this.handleShowUpload}>
                      上传头像
                    </Button>
                    <input type="file" style={{display: 'none'}} ref="avatarFile" onChange={this.handleUpload} />
                  </Fragment>
                )
              }
              <div>{this.renderUserProfile()}</div>
            </ProfileCard>
            { this.renderSelfProfile() }
          </Grid>
          <Grid item sm={4}>
            <ProfileCard>
              <div>
                <span>允许编辑: {JSON.stringify(allowEdit)}</span>
                {JSON.stringify(userInfo)}
              </div>
            </ProfileCard>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default withTracker(({match}) => {
  const userId = match.params.userId || Meteor.userId();
  const isSelf = userId ? userId === Meteor.userId() : true;

  let tracker = {
    isSelf,
    userId,
    allowEdit: isSelf,
    userInfo: userId ? Meteor.users.findOne(userId) : Meteor.user(),
  }

  if(isSelf) {
    // 如果是自己的profile的话追踪看板
    const allKanbanHandler = Meteor.subscribe('kanban.all');
    const allTeamHandler = Meteor.subscribe('team.all');

    let kanban = {};
    kanban.self = Kanban.find({
      userId,
      'members.1': { $exists:0 }
    }).fetch(); // 个人看板: 拥有者为自己且成员只有一人
    kanban.team = Kanban.find({
      members: userId,
      'members.1': { $exists:1 }
    }).fetch(); // 团队看板: 成员中有自己且至少有两人
    tracker.kanban = kanban;

    tracker.team = Team.find({
      members: userId
    })
  }

  return tracker;
})(ProfileRoute)
