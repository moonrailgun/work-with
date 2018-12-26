import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const Container = styled(Grid)`
  padding-top: ${props => props.theme.spacing.unit * 2}px;
`

const ProfileCard = styled(Paper)`
  padding: ${props => props.theme.spacing.unit}px;
  margin-bottom: ${props => props.theme.spacing.unit}px;
`

class ProfileRoute extends React.Component {
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
            <ProfileCard>用户信息</ProfileCard>
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
