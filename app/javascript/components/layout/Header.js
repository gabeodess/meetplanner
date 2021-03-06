import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import csrfToken from '../../helpers/csrfToken';
import history from '../../helpers/history';
import routes from '../../helpers/routes';

class Header extends React.PureComponent {
  signOut = () => {
    const { signOut } = this.props;
    axios.delete('/users/sign_out', { data: { authenticity_token: csrfToken() } }).then(
      () => {
        signOut();
        history.push('/');
      },
    );
  }

  render() {
    const { currentUser } = this.props;

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
                <Link className="nav-link" to={routes.searchEvents}>Browse Events</Link>
              </li>
              <li className={`nav-item ${!currentUser && 'd-none'}`}>
                <Link className="nav-link" to="/events">My Events</Link>
              </li>

              <li className="nav-item">
                {currentUser ? (
                  <Link className="nav-link" to="/" onClick={this.signOut}>Logout</Link>
                ) : (
                  <Link className="nav-link" to={routes.newSession}>Login</Link>
                )}
              </li>
            </ul>
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
