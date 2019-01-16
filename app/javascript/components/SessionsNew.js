import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import csrfToken from '../helpers/csrfToken';
import history from '../helpers/history';

class SessionsNew extends React.Component {
  state = { error: null }

  onSubmit = (event) => {
    const { signIn } = this.props;
    event.preventDefault();
    axios.post('/users/sign_in', $('form').serialize()).then(
      (response) => {
        signIn(response.data);
        history.push('/');
      },
      (error) => {
        const { status, data } = error.response;
        if (status === 401) {
          this.setState({ error: data.error });
        }
      },
    );
  }

  render() {
    const { error } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4 offset-sm-4">
            <h2>Log in</h2>
            {/* eslint-disable jsx-a11y/click-events-have-key-events */}
            <div className={`alert alert-danger ${!error ? 'd-none' : ''}`}>
              <div role="button" tabIndex={0} className="close" onClick={() => { this.setState({ error: null }); }}>&times;</div>
              {error}
            </div>
            {/* eslint-enable jsx-a11y/click-events-have-key-events */}
            <form onSubmit={this.onSubmit}>
              <input name="authenticity_token" type="hidden" value={csrfToken()} />
              <div className="form-group">
                <label htmlFor="email">
                  Email
                  <br />
                  <input name="user[email]" id="email" type="text" className="form-control" />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  Password
                  <br />
                  <input name="user[password]" id="password" type="password" className="form-control" />
                </label>
              </div>

              <div className="form-group">
                <input type="submit" value="Submit" className="btn btn-primary actions" />
              </div>

              <div>
                <p>
                  <Link to="/forgot-password">Forgot password</Link>
  ?
                </p>
                <p>
                Not registered?&nbsp;
                  <Link to="/register">Sign up</Link>
  .
                </p>
              </div>

            </form>
          </div>
        </div>
      </div>
    );
  }
}

SessionsNew.propTypes = {
  signIn: PropTypes.func.isRequired,
};

export default SessionsNew;
