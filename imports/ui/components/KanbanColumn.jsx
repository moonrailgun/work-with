import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import AddIcon from '@material-ui/icons/Add';

const styles = ({shape, spacing, shadows, palette}) => ({
  gridItem: {
    flexShrink: 0,
    position: 'relative',
  },
  colAdd: {
    borderRadius: shape.borderRadius,
    boxShadow: shadows[2],
    padding: 0,
    backgroundColor: 'rgba(0,0,0,.24)',
    color: palette.common.white,
  },
  colAddGrow: {
    position: 'absolute',
    top: spacing.unit,
    left: spacing.unit,
    right: spacing.unit
  }
})

class KanbanColumn extends React.Component {
  state = {
    isAddNew: false,
  }

  renderColAdd() {
    const {
      classes,
    } = this.props;

    return (
      <ClickAwayListener onClickAway={() => this.setState({isAddNew: false})}>
        <Grow in={this.state.isAddNew}>
          <Paper className={classes.colAddGrow} elevation={4}>
            <div>这里是需要输入的菜单项</div>
          </Paper>
        </Grow>
      </ClickAwayListener>
    )
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
            <Button style={{color: 'white'}} fullWidth onClick={() => this.setState({isAddNew: true})}><AddIcon />添加另一个列表</Button>
          </div>
          {this.state.isAddNew && this.renderColAdd()}
        </Grid>
      )
    }
  }
}

export default withStyles(styles)(KanbanColumn);
