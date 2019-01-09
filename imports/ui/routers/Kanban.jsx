import React, { Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/erasaur:meteor-lodash';
import { Kanban } from '/imports/api/kanban/kanban';
import { KanbanColumn } from '/imports/api/kanban/kanbanColumn';
import { Card } from '/imports/api/card/card';
import KanbanContainer from '/imports/ui/components/KanbanContainer';
import CardDetailContainer from '/imports/ui/components/CardDetailContainer';
import UserAvatar from '/imports/ui/components/UserAvatar';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    overflow: 'hidden',
    height: '100%',
  },
  main: {
    height: '100%',
  }
})

class KanbanRoute extends React.Component {
  state = {
    selectedCardId: null,
  }

  onChangeCardDetail(cardId) {
    this.setState({selectedCardId: cardId});
  }

  onAddMember = () => {
    console.log('添加成员');
  }

  renderMembers() {
    const members = _.get(this.props.kanbanInfo, 'members', []);

    return (
      <Grid container>
        {members.map(userId => <UserAvatar userId={userId} />)}
      </Grid>
    )
  }

  renderActions() {
    return (
      <Grid container>
        <Button color="secondary" onClick={this.onAddMember}>{__('action.addMember')}</Button>
      </Grid>
    )
  }

  render() {
    const {
      match,
      classes,
      kanbanInfo,
      kanbanCols,
      kanbanCards,
    } = this.props;
    const { kanbanId } = match.params;

    return (
      <Grid container wrap="nowrap" className={classes.container}>
        <Grid
          container
          direction="column"
          item
          xs
        >
          <div><h3>{kanbanInfo.title}</h3></div>
          {this.renderMembers()}
          {this.renderActions()}
          <Grid container item xs>
            <KanbanContainer
              kanbanId={kanbanId}
              kanbanCols={kanbanCols}
              kanbanCards={kanbanCards}
              onChangeCardDetail={(cardId) => this.onChangeCardDetail(cardId)}
              />
          </Grid>
        </Grid>
        <Grid
          item
        >
          <Hidden smDown>
            <CardDetailContainer cardId={this.state.selectedCardId}/>
          </Hidden>
        </Grid>
      </Grid>
    )
  }
}

const route = withTracker(({match}) => {
  const kanbanId = match.params.kanbanId;
  const userId = Meteor.userId();
  if(userId) {
    localStorage.setItem(`last-kanban-id#${userId}`, kanbanId);
  }

  const allKanbanHandler = Meteor.subscribe('kanban.all');
  const allKanbanColsHandler = Meteor.subscribe('kanban.cols.all', { kanbanId });
  const allCardHandler = Meteor.subscribe('card.all', { kanbanId });
  const kanbanInfo = Kanban.find(kanbanId).fetch()[0] || {};
  let kanbanCols = [];
  let kanbanCards = [];

  // 看板信息已加载
  if(kanbanInfo && kanbanInfo.cols) {
    let cols = kanbanInfo.cols || [];
    kanbanCols = KanbanColumn.find({
      _id: {
        $in: cols
      }
    }).fetch();
    kanbanCards = Card.find({
      cardColId: {
        $in: cols
      }
    }).fetch();
  }
  return {
    loading: !allKanbanHandler.ready() || !allKanbanColsHandler.ready() || !allCardHandler.ready(),
    kanbanInfo,
    kanbanCols,
    kanbanCards,
  }
})(KanbanRoute)

export default withStyles(styles)(route);
