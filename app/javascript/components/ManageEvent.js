import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import routes from '../helpers/routes';
import csrfToken from '../helpers/csrfToken';
import formatDate, { formatTime } from '../helpers/formatDate';

class ManageEvent extends React.Component {
  state = {}

  componentDidMount() {
    this.fetchEvent();
  }

  deleteGroup = (e, id) => {
    axios.delete(routes.api.group(id), { data: { authenticity_token: csrfToken() } }).then(
      () => this.fetchEvent(),
    );
  }

  closeEvent = () => {
    const { match } = this.props;
    axios.post(routes.api.closeEvent(match.params.id), { authenticity_token: csrfToken() }).then(
      ({ data }) => { this.setState({ event: data }); },
    );
  }

  openEvent = () => {
    const { match } = this.props;
    axios.post(routes.api.openEvent(match.params.id), { authenticity_token: csrfToken() }).then(
      ({ data }) => { this.setState({ event: data }); },
    );
  }

  fetchEvent = () => {
    const { match } = this.props;
    axios.get(routes.api.event(match.params.id), {
      data: { authenticity_token: csrfToken() },
    }).then(
      ({ data }) => { this.setState({ event: data }); },
    );
  }

  render() {
    const { event } = this.state;

    if (event === undefined) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <div className="text-center">
          <h1>{event.title}</h1>
          <h2>Sessions</h2>
        </div>
        <table className="table">
          <thead>
            <tr>
              <td>Description</td>
              <td>Date</td>
              <td>Weigh-in Time</td>
              <td>Start Time</td>
              <td># Athletes</td>
              <td />
            </tr>
          </thead>
          <tbody>
            {(() => {
              if (event.groups) {
                return event.groups.map(group => (
                  <tr key={group.id}>
                    <td>{group.description}</td>
                    <td>{formatDate(group.date)}</td>
                    <td>{formatTime(group.weigh_in_at)}</td>
                    <td>{formatTime(group.start_at)}</td>
                    <td />
                    <td>
                      <Link to={routes.editGroup(group.id)} className="btn btn-link">Edit info</Link>
                      <button type="button" className="btn btn-link" onClick={e => this.deleteGroup(e, group.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ));
              }
              return (
                <tr>
                  <td colSpan="6" className="text-center">No sessions at this time.</td>
                </tr>
              );
            })()}
          </tbody>
        </table>
        <div className="row">
          <div className="col-sm-8 offset-sm-2">
            <div className="row text-uppercase">
              <div className="col-sm-6">
                <Link to={routes.newEventGroup(event.id)} className="btn btn-primary btn-block">Create Session</Link>
              </div>
              <div className="col-sm-6">
                <Link to={routes.editEvent(event.id)} className="btn btn-primary btn-block">Edit Event Info</Link>
              </div>
              <div className="col-sm-6 mt-4">
                <button type="button" className="btn btn-primary btn-block text-uppercase">Manage Athletes</button>
              </div>
              <div className="col-sm-6 mt-4">
                {event.closed_at ? (
                  <button type="button" className="btn btn-primary btn-block text-uppercase" onClick={this.openEvent}>Open Registration</button>
                ) : (
                  <button type="button" className="btn btn-primary btn-block text-uppercase" onClick={this.closeEvent}>Close Registration</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ManageEvent.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ManageEvent;
