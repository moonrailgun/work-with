import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = ({shape, spacing, shadows, palette}) => ({
  gridItem: {
    flexShrink: 0,
  },
  colAdd: {
    borderRadius: shape.borderRadius,
    boxShadow: shadows[2],
    padding: 0,
    backgroundColor: 'rgba(0,0,0,.24)',
    color: palette.common.white,
  },
})

class KanbanColumn extends React.Component {
  state = {
    isAddNew: false,
  }

  render() {
    const {
      newCol = false,
      children,
      classes,
    } = this.props;

    const gridProps = {
      item: true,
      xs: 12,
      sm: 3,
      md: 2,
      className: classes.gridItem,
    }

    if(!newCol) {
      return (
        <Grid {...gridProps}>
          {children}
        </Grid>
      )
    }else {
      return (
        <Grid {...gridProps}>
          <div className={classes.colAdd}>
            <Button fullWidth onClick={() => this._handleAddCol()}><AddIcon />添加另一个列表</Button>
          </div>
        </Grid>
      )
    }
  }
}

export default withStyles(styles)(KanbanColumn);
