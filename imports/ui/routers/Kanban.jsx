import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Kanban } from '/imports/api/kanban/kanban';
import { KanbanColumn } from '/imports/api/kanban/kanbanColumn';
import { Card } from '/imports/api/card/card';
import KanbanContainer from '/imports/ui/components/KanbanContainer';
import CardDetailContainer from '/imports/ui/components/CardDetailContainer';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  container: {
    overflow: 'hidden',
    height: '100%',
  },
})

class KanbanRoute extends React.Component {
  state = {
    selectedCardId: null,
  }

  onChangeCardDetail(cardId) {
    this.setState({selectedCardId: cardId});
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
      <Grid container className={classes.container}>
        <Grid
          container
          direction="column"
          item
          xs
        >
          <div><h3>{kanbanInfo.title}</h3></div>
          <KanbanContainer
            kanbanId={kanbanId}
            kanbanCols={kanbanCols}
            kanbanCards={kanbanCards}
            onChangeCardDetail={(cardId) => this.onChangeCardDetail(cardId)}
          />
        </Grid>
        <Grid
          item
        >
          <CardDetailContainer cardId={this.state.selectedCardId}/>
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
