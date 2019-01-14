import React from "react"
import PropTypes from "prop-types"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from './layout/Header'
import {default as EventsSearch} from './events/Search'
import {default as SessionsNew} from './sessions/New'
import {default as RegistrationsNew} from './registrations/New'

class App extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Router>
          <React.Fragment>
            <Header/>
            <Route path="/" exact component={EventsSearch}/>
            <Route path="/signin" component={SessionsNew}/>
            <Route path="/register" component={RegistrationsNew}/>
          </React.Fragment>
        </Router>
      </React.Fragment>
    );
  }
}

export default App
