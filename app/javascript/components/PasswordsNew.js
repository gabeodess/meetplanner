import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import csrfToken from '../helpers/csrfToken';

class PasswordsNew extends React.Component {
  state = { errors: {} }

  onSubmit = (event) => {
    event.preventDefault();
    axios.post('/users/password', $('form#new-password').serialize()).then(
      () => {
        this.setState({ recipient: $('#email').val() });
      },
      (error) => {
        this.setState({ errors: error.response.data.errors });
      },
    );
  }

  renderForm() {
    const { errors } = this.state;

    return (
      <React.Fragment>
        <h2>Reset password</h2>
        <form onSubmit={this.onSubmit} id="new-password">
          <input name="authenticity_token" type="hidden" value={csrfToken()} />
          <div className="form-group">
            <label htmlFor="email">
            Email
              <br />
              <input name="user[email]" type="email" className={`form-control ${errors.email && 'is-invalid'}`} id="email" />
              <div className={`invalid-feedback ${!errors.email && 'hidden'}`}>
                {errors.email}
              </div>
            </label>
          </div>

          <div className="form-group">
            <input type="submit" value="Send me reset password instructions" className="btn btn-primary actions" />
          </div>
        </form>
      </React.Fragment>
    );
  }

  render() {
    const { recipient } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4 offset-sm-4">
            {
              recipient ? (
                <div>
                  <div className="alert alert-success">
                    A link to reset your password was sent to &quot;
                    {recipient}
                    &quot;
                  </div>
                  <h2>
                    <Link to="/signin">Log in</Link>
                  </h2>
                </div>
              ) : (
                this.renderForm()
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default PasswordsNew;
