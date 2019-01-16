import React from 'react';
import { Router, Route } from 'react-router-dom';
import Header from './layout/Header';
import history from './history';
import EventsSearch from './EventsSearch';
import SessionsNew from './SessionsNew';
import UsersNew from './UsersNew';

class App extends React.Component {
  state = { currentUser: null }

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
          <Route path="/signin" component={SessionsNew} />
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
