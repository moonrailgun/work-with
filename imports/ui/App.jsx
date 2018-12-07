import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Login from './routers/Login';
import Register from './routers/Register';
import Dashboard from './routers/Dashboard';
import Kanban from './routers/Kanban';
import NotFound from './routers/NotFound';
import Hello from './Hello.jsx';
import Info from './Info.jsx';
import LanguageToggle from './components/LanguageToggle.jsx';
import NavBar from './components/NavBar.jsx';
import { ThemeProvider } from 'styled-components';

import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

class App extends React.Component {
  state = {
    redirectTo: '',
    defaultKanbanId: localStorage.getItem('last-kanban-id'),
  }

  renderRedirect() {
    const { redirectTo, defaultKanbanId } = this.state;
    const { pathname } = location;
    const { user } = this.props;

    let redirect = null;
    if (redirectTo && redirectTo !== pathname) {
      redirect = <Redirect to={redirectTo} />
    } else if(pathname === '/') {
      if(!user) {
        redirect = <Redirect to="/login" />
      }else if(defaultKanbanId) {
        redirect = <Redirect to={'/kanban/' + defaultKanbanId} />
      }else {
        redirect = <Redirect to="/dashboard" />
      }
    }

    return redirect;
  }

  renderContent() {
    return (
      <div>
        <CssBaseline />
        <LanguageToggle />
        <ThemeProvider theme={theme}>
          <div id="basic-route">
            <Route component={NavBar}></Route>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/kanban/:kanbanId?" component={Kanban} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </ThemeProvider>
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
    user: Meteor.user(),
  }
})(App);
