import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import history from './history';

const authenticityToken = decodeURIComponent(document.cookie.match('X-CSRF-Token=([^;]+)')[1]);

const disableFormSubmitButton = (form) => {
  $(form).find('input[type=submit]').attr({ disabled: 'disabled' });
};

const enableFormSubmitButton = (form) => {
  $(form).find('input[type=submit]').attr({ disabled: null });
};

class UsersNew extends React.Component {
  state = {
    user: { email: '', password: '', password_confirmation: '' }, errors: {},
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { target } = event;
    const { signIn } = this.props;
    const { user } = this.state;

    disableFormSubmitButton(target);

    axios.post('/users', { user, authenticity_token: authenticityToken }).then(
      (response) => {
        signIn(response.data);
        history.push('/');
      },
      (error) => {
        const { status, data } = error.response;

        if (status === 422) {
          this.setState({ errors: data.errors });
        }
      },
    ).finally(() => {
      enableFormSubmitButton(target);
    });
  }

  onChange = (event) => {
    const { user } = this.state;
    const { target } = event;
    this.setState({ user: { ...user, [target.name]: target.value } });
  }

  render() {
    const { errors } = this.state;

    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-sm-4 offset-sm-4">
              <h2>Sign up</h2>

              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">
                    Email
                    <br />
                    <input name="email" id="email" type="text" onChange={this.onChange} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    <div className={`invalid-feedback ${!errors.email ? 'hidden' : ''}`}>
                      {errors.email}
                    </div>
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="password">
                    Password
                    <br />
                    <input name="password" id="password" type="password" onChange={this.onChange} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                    <div className={`invalid-feedback ${!errors.password ? 'hidden' : ''}`}>
                      {errors.password}
                    </div>
                  </label>
                </div>

                <div className="form-group">
                  <label htmlFor="password-confirmation">
                    Password Confirmation
                    <br />
                    <input name="password_confirmation" id="password-confirmation" type="password" onChange={this.onChange} className={`form-control ${errors.password_confirmation ? 'is-invalid' : ''}`} />
                    <div className={`invalid-feedback ${!errors.password_confirmation ? 'hidden' : ''}`}>
                      {errors.password_confirmation}
                    </div>
                  </label>
                </div>

                <div className="form-group">
                  <input type="submit" className="btn btn-primary actions" />
                </div>

                <div>
                  <p>
                    Already registered?&nbsp;
                    <Link to="/signin">Login</Link>
.
                  </p>
                </div>

              </form>

            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

UsersNew.propTypes = {
  signIn: PropTypes.func.isRequired,
};

export default UsersNew;
