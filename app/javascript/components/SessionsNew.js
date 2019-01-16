import React from 'react';
import { Link } from 'react-router-dom';

const SessionsNew = () => (
  <div className="container">
    <div className="row">
      <div className="col-sm-4 offset-sm-4">
        <h2>Log in</h2>
        <form>
          <div className="form-group">
            <label htmlFor="email">
                Email
              <br />
              <input name="email" id="email" type="text" />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="password">
                Password
              <br />
              <input name="password" id="password" type="password" />
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

export default SessionsNew;
