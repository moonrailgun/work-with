import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

const styles = theme => ({
  root: {
    height: 96,
  },
  actionArea: {
    padding: 8,
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 0,
    height: '100%',
    overflowWrap: 'break-word',
  },
  newCard: {
    padding: 0,
    textAlign: 'center',
  }
})

function KanbanItem (props) {
  const {
    classes,
    isNew = false,
    title,
    onClick,
  } = props;

  return (
    <Card onClick={onClick} className={classes.root}>
      <CardActionArea className={classes.actionArea}>
        {
          isNew ? (
            <CardContent className={classes.newCard}>
              创建新看板
            </CardContent>
          ) : (
            <CardContent className={classes.content}>
              {title}
            </CardContent>
          )
        }
      </CardActionArea>
    </Card>
  )
}

export default withStyles(styles)(KanbanItem);
