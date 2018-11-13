import React from 'react';
import { Accounts } from 'meteor/accounts-base';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMsg: '',
    }
  }

  _handleRegister() {
    const {
      email,
      password,
    } = this.state;
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
    return (
      <div>
        {
          this.state.errorMsg && (
            <div>{this.state.errorMsg}</div>
          )
        }
        <div>
          <label>用户名</label>
          <input
            type="text"
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
        <button onClick={() => this._handleRegister()}>创建账号</button>
      </div>
    )
  }
}
