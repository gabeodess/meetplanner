import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import FormFor from './forms/FormFor';
import Loading from './Loading';
import GroupFields from './GroupFields';

import csrfToken from '../helpers/csrfToken';
import history from '../helpers/history';
import routes from '../helpers/routes';

class NewGroup extends React.Component {
  state = { group: {} }

  componentDidMount() {
    const { match } = this.props;
    axios.get(routes.api.event(match.params.id)).then(
      ({ data }) => this.setState({ event: data }),
    );
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { event } = this.state;
    axios.post(routes.api.eventGroups(event.id), $('form').serialize()).then(
      ({ data }) => history.push(routes.manageEvent(data.event_id)),
      (error) => {
        const { status, data } = error.response;
        if (status === 422) {
          this.setState({ group: data });
        }
      },
    );
  }

  render() {
    const { event, group } = this.state;

    if (!event) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <h1 className="text-center">New Session</h1>
        <FormFor object={group} scope="group" onSubmit={this.onSubmit}>
          <input type="hidden" value={csrfToken()} name="authenticity_token" />
          <GroupFields />
          <div className="text-center">
            <input type="submit" value="Submit" className="btn btn-primary" />
          </div>
        </FormFor>
        <div className="text-center">
          <Link to={routes.manageEvent(event.id)} className="btn btn-link">Cancel</Link>
        </div>
      </React.Fragment>
    );
  }
}

NewGroup.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default NewGroup;
