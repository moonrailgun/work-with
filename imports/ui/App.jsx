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
import NavBar from './components/NavBar.jsx';

// i18n.setLocale('zh-CN');
//
// console.log(i18n.getLocale())

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: '',
      defaultKanban: '',
    };
  }

  renderRedirect() {
    const { redirectTo, defaultKanban } = this.state;
    const { pathname } = location;
    let redirect = null;
    if (redirectTo && redirectTo !== pathname) {
      redirect = <Redirect to={redirectTo} />
    } else if(pathname === '/' && defaultKanban) {
      redirect = <Redirect ro={defaultKanban} />
    }

    return redirect;
  }

  renderContent() {
    return (
      <div>
        <LanguageToggle />
        <NavBar />
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

  render() {
    return (
      <BrowserRouter>
        <Route
          render={({ location }) => (
            this.renderRedirect(location) || this.renderContent(location)
          )}
        />
      </BrowserRouter>
    )
  }
}

export default withTracker(() => {
  return {
  }
})(App);
