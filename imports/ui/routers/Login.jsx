import React from 'react';
import Blaze from 'meteor/gadicc:blaze-react-component';
import i18n from 'meteor/universe:i18n';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMsg: '',
    }
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
          errorMsg: i18n.__(`server.not`),
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
    return (
      <div>
        {
          this.state.errorMsg && (
            <div>{this.state.errorMsg}</div>
          )
        }
        <div>
          <label>用戶名</label>
          <input
            type="email"
            value={this.state.email}
            onChange={(e) => this.setState({email: e.target.value})}
          />
        </div>
        <div>
          <label>密码</label>
          <input
            type="password"
            value={this.state.password}
            onChange={(e) => this.setState({password: e.target.value})}
          />
        </div>
        <button onClick={() => this._handleLogin()}>登录</button>
        <button onClick={() => this._handleRegister()}>注册</button>
      </div>
    )
  }
}
