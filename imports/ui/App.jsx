import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Login from './routers/Login';
import Register from './routers/Register';
import Kanban from './routers/Kanban';
import Hello from './Hello.jsx';
import Info from './Info.jsx';
import LanguageToggle from './components/LanguageToggle.jsx';
// 
// i18n.setLocale('zh-CN');
//
// console.log(i18n.getLocale())

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to Meteor!</h1>
        <Hello />
        <Info />
        <LanguageToggle />
        <div>连接状况: {JSON.stringify(this.props.connected)}</div>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/kanban" component={Kanban} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default withTracker(() => {
  return {
    user: Meteor.user(),
    connected: Meteor.status().connected,
  }
})(App);
