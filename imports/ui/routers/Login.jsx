import React from 'react';
import PropTypes from 'prop-types';
import Blaze from 'meteor/gadicc:blaze-react-component';
import i18n from 'meteor/universe:i18n';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Snackbar from '@material-ui/core/Snackbar';

import { ToastMessageContent } from '../components/ToastMessage';

const styles = theme => ({
  loginContainer: {
    display: 'flex',
    flexDirection: 'column'
  }
})

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMsg: '',
      showPassword: false,
    }
  }

  _handleClickShowPassword() {
    this.setState({showPassword: !this.state.showPassword})
  }

  _handleLogin() {
    console.log('登录', this.state.email, this.state.password);
    const {
      email,
      password,
    } = this.state;

    Meteor.loginWithPassword(email, password, (err) => {
      if(err) {
        this.setState({
          // errorMsg: i18n.__(`server.${err.reason}`),
          errorMsg: i18n.__(`${err.reason}`),
        });
      }else {
        console.log('登录成功')
        this.props.history.push('/kanban');
      }
    })
  }

  _handleRegister() {
    this.props.history.push('/register');
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className="login"
      >
        <Grid item className="login-container">
          <Card>
            <CardContent className={classes.loginContainer}>
              <h2>登录</h2>
              <Snackbar
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                open={!!this.state.errorMsg}
                autoHideDuration={60000}
                onClose={() => this.setState({errorMsg: ''})}
              >
                <ToastMessageContent
                  onClose={() => this.setState({errorMsg: ''})}
                  variant="error"
                  message={<span>{this.state.errorMsg}</span>}
                  action={[
                    <IconButton
                      key="close"
                      aria-label="Close"
                      onClick={() => this.setState({errorMsg: ''})}
                      >
                      <CloseIcon />
                    </IconButton>,
                  ]}
                />
              </Snackbar>
              <TextField
                id="login-email"
                type="email"
                label="电子邮箱"
                margin="normal"
                value={this.state.email}
                onChange={(e) => this.setState({email: e.target.value})}
                />
              <FormControl
                margin="normal"
                >
                <InputLabel htmlFor="login-password">密码</InputLabel>
                <Input
                  id="login-password"
                  type={this.state.showPassword ? 'text' : 'password'}
                  value={this.state.password}
                  onChange={(e) => this.setState({password: e.target.value})}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={this._handleClickShowPassword}
                        >
                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  />
              </FormControl>
              <FormControl
                margin="normal"
                >
                <Button variant="contained" color="primary" onClick={() => this._handleLogin()}>
                  登录
                </Button>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Login);
