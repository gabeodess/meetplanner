import React from "react"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import axios from "axios"

class New extends React.Component {

  onSubmit = (event) => {
    event.preventDefault()

    axios.post("/users", this.state).then(response => {
      console.log(response)
    })
  }

  onChange = (event) => {
    const {target} = event
    this.setState({[target.name]: target.value})
  }

  render () {
    return (
      <React.Fragment>
        <div className='container'>
          <div className="row">
            <div className='col-sm-4 offset-sm-4'>
              <h2>Sign up</h2>

              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor='email'>
                    Email<br/>
                    <input name='email' id='email' type='text' onChange={this.onChange}/>
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor='password'>
                    Password<br/>
                    <input name='password' id='password' type='password' onChange={this.onChange}/>
                  </label>
                </div>

                <div className="form-group">
                  <label htmlFor='password-confirmation'>
                    Password Confirmation<br/>
                    <input name='password-confirmation' id='password-confirmation' type='password' onChange={this.onChange}/>
                  </label>
                </div>

                <div className="form-group">
                  <input type='submit' className='btn btn-primary actions'/>
                </div>

                <div>
                  <p>Already registered? <Link to="/signin">Login</Link>.</p>
                </div>

              </form>

            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default New
