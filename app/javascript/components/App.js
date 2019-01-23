import React from 'react';
import { Router, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './layout/Header';
import history from '../helpers/history';
import EventsSearch from './EventsSearch';
import SessionsNew from './SessionsNew';
import UsersNew from './UsersNew';
import PasswordsNew from './PasswordsNew';

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
          <Route path="/" exact component={EventsSearch} />
          <Route path="/forgot-password" exact component={PasswordsNew} />
          <Route
            path="/signin"
            render={props => <SessionsNew {...props} signIn={this.signIn} />}
          />
          <Route
            path="/register"
            render={props => <UsersNew {...props} signIn={this.signIn} />}
          />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
