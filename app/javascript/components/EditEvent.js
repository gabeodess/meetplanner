import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import routes from '../helpers/routes';
import history from '../helpers/history';
import EventForm from './EventForm';

class EditEvent extends React.Component {
  state = {}

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    axios.get(routes.api.event(id)).then(
      result => this.setState({ event: result.data }),
    );
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { match } = this.props;
    const { id } = match.params;

    axios.put(routes.api.event(id), $('form').serialize()).then(
      () => history.push(routes.event(id)),
      (error) => {
        const { status, data } = error.response;
        if (status === 422) {
          this.setState((state) => {
            const { event } = state;
            event.errors = data.errors;
            return { event };
          });
        }
      },
    );
  }

  render() {
    const { event } = this.state;

    return (
      <div className="container">
        <h1>Edit Event</h1>
        {event ? (
          <EventForm object={event} onSubmit={this.onSubmit} />
        ) : (
          <div className="text-center">Loading...</div>
        )}
      </div>
    );
  }
}

EditEvent.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default EditEvent;
