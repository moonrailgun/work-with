import React from 'react';
import { Accounts } from 'meteor/accounts-base';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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
  root: {
    marginTop: 140,
    width: 320,
  },
  registerContainer: {
    display: 'flex',
    flexDirection: 'column'
  }
})

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      repeat: '',
      errorMsg: '',
    }
  }

  _handleRegister(e) {
    e && e.preventDefault();

    const {
      email,
      password,
      repeat,
    } = this.state;

    if(!email) {
      this.setState({ errorMsg: '请输入邮箱' });
      return;
    }

    if(!password) {
      this.setState({ errorMsg: '请输入密码' });
      return;
    }

    if(password.length < 6) {
      this.setState({ errorMsg: '密码长度不能低于6位' });
      return;
    }

    if(password !== repeat) {
      this.setState({ errorMsg: '重复密码不正确' });
      return;
    }

    Accounts.createUser({
      email,
      password,
    }, (err) => {
      if (err) {
        this.setState({
          errorMsg: err.reason,
        });
      }else {
        console.log('创建成功');
      }
    });
  }

  render() {
    const {
      classes,
    } = this.props;

    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item className="login-container">
          <Card className={classes.root}>
            <CardContent className={classes.registerContainer}>
              <Typography variant="h5" noWrap>
                <IconButton
                  key="back"
                  onClick={() => this.props.history.push('/login')}
                  >
                  <ArrowBackIcon />
                </IconButton>
                注册账号
              </Typography>
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
              <form onSubmit={(e) => this._handleRegister(e)} className={classes.registerContainer}>
                <TextField
                  id="login-email"
                  type="email"
                  label="电子邮箱"
                  margin="dense"
                  value={this.state.email}
                  onChange={(e) => this.setState({email: e.target.value})}
                />
                <TextField
                  id="login-password"
                  type="password"
                  label="密码"
                  margin="dense"
                  value={this.state.password}
                  onChange={(e) => this.setState({password: e.target.value})}
                />
                <TextField
                  id="login-password-repeat"
                  type="password"
                  label="重复密码"
                  margin="dense"
                  value={this.state.repeat}
                  onChange={(e) => this.setState({repeat: e.target.value})}
                />
                <FormControl
                  margin="normal"
                  >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    注册新账号
                  </Button>
                </FormControl>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Register);
