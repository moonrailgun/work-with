import React, { Fragment } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';
import { Avatar } from '/imports/api/files/avatar';
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
`

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
              用户信息
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
            </ProfileCard>
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
  const userId = match.params.userId;

  return {
    allowEdit: userId ? userId === Meteor.userId() : true,
    userInfo: userId ? Meteor.users.findOne(userId) : Meteor.user(),
  }
})(ProfileRoute)
