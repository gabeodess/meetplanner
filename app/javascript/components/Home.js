import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../helpers/routes';

const Home = () => (
  <React.Fragment>
    <div style={{ height: 300, overflow: 'hidden' }}>
      <img
        src={`http://placekitten.com/${1200 + Math.round((Math.random() * 100))}/420`}
        className="img-fluid"
        alt="Responsive"
      />
    </div>
    <div className="container">
      <h1 className="text-center">Set your next goal</h1>
      <div className="row text-center">
        <div className="col-sm-4 offset-sm-2">
          <div className="h2">Athletes</div>
          <p className="text-left">Search for sanctioned events near you and register with ease.</p>
          <Link to={routes.searchEvents} className="btn btn-primary text-uppercase">Browse Events</Link>
        </div>
        <div className="col-sm-4">
          <div className="h2">Meet Directors</div>
          <p className="text-left">Planning an event soon?  Register or log in to create or manage your event.</p>
          <Link to={routes.newSession} className="btn btn-primary text-uppercase">Login or Register</Link>
        </div>
      </div>
    </div>
  </React.Fragment>
);

export default Home;
