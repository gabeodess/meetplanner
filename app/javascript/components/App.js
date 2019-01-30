import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Header from './layout/Header';
import history from '../helpers/history';
import routes from '../helpers/routes';
import EventsSearch from './EventsSearch';
import EventsIndex from './EventsIndex';
import Event from './Event';
import EventsNew from './EventsNew';
import EditEvent from './EditEvent';
import SessionsNew from './SessionsNew';
import UsersNew from './UsersNew';
import PasswordsNew from './PasswordsNew';
import Home from './Home';

class App extends React.Component {
  state = { currentUser: null }

  componentDidMount() {
    axios.get('/api/v1/sessions/current').then(
      (response) => {
        window.response = response;
        this.setState({ currentUser: response.data });
      },
      () => {
        // 401 means not logged in, do nothing
      },
    );
  }

  signIn = (user) => {
    this.setState({ currentUser: user });
  }

  signOut = () => {
    this.setState({ currentUser: null });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <Router history={history}>
        <React.Fragment>
          <Header currentUser={currentUser} signOut={this.signOut} />
          <Route path="/" exact component={Home} />
          <div className="container">
            <Switch>
              <Route path="/forgot-password" exact component={PasswordsNew} />
              <Route path={routes.searchEvents} component={EventsSearch} />
              <Route path={routes.events} exact component={EventsIndex} />
              <Route path={routes.newEvent} exact component={EventsNew} />
              <Route path={routes.event(':id')} exact component={Event} />
              <Route path={routes.editEvent(':id')} exact component={EditEvent} />
              <Route
                path={routes.newSession}
                render={props => <SessionsNew {...props} signIn={this.signIn} />}
              />
              <Route
                path="/register"
                render={props => <UsersNew {...props} signIn={this.signIn} />}
              />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
