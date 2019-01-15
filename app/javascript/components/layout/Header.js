import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Header extends React.PureComponent {
  render() {
    const { currentUser, signOut } = this.props;

    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">MeetPlanner</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">

              <li className="nav-item">
                <Link className="nav-link" to="/">Browse Events</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/calculator">Calculator</Link>
              </li>

              <li className="nav-item">
                {currentUser ? (
                  <Link className="nav-link" to="/" onClick={signOut}>Logout</Link>
                ) : (
                  <Link className="nav-link" to="/signin">Login</Link>
                )}
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Find event" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
  }),
  signOut: PropTypes.func.isRequired,
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
