import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import RefreshIcon from '@material-ui/icons/Refresh';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  networkTip: {
    marginLeft: 6,
    marginRight: 6,
    color: theme.palette.grey['500'],
    fontSize: '1rem',
  },
  networkTipIcon: {
    fontSize: '1rem',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
})

class NavBar extends React.Component {
  renderNetworkInfo() {
    const {
      connected,
      classes,
    } = this.props;

    if(!connected) {
      return (
        <Typography variant="h6" color="inherit" noWrap className={classes.networkTip}>
          <span>无法正常连接到服务器，请检查您的网络连接</span>
          <IconButton color="inherit" onClick={() => window.location.reload()} className={classes.networkTipIcon}>
            <RefreshIcon fontSize="inherit" />
          </IconButton>
        </Typography>
      )
    }
  }

  renderUserInfo() {
    const {
      user
    } = this.props;

    if(user) {
      return (
        <div>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </div>
      )
    }
  }

  render() {
    const {
      teamName = 'Self',
      classes,
    } = this.props;

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" className={classes.menuButton}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Work-With-{teamName}
            </Typography>
            {this.renderNetworkInfo()}
            <div className={classes.grow}></div>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="搜索..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            {this.renderUserInfo()}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withTracker(() => {
  return {
    user: Meteor.user(),
    connected: Meteor.status().connected,
  }
})(withStyles(styles)(NavBar))
