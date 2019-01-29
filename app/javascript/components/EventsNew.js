import React from 'react';
import axios from 'axios';
import routes from '../helpers/routes';
import history from '../helpers/history';
import EventForm from './EventForm';

class EventsNew extends React.Component {
  state = { event: {} }

  onSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/v1/events', $('form#event-form').serialize()).then(
      () => { history.push(routes.events); },
      (error) => {
        const { status, data } = error.response;
        if (status === 422) {
          this.setState({ event: data });
        }
      },
    );
  }

  render() {
    const { event } = this.state;

    return (
      <div>
        <h1>Create an Event</h1>
        <EventForm object={event} onSubmit={this.onSubmit} submitText="Create" />
      </div>
    );
  }
}

export default EventsNew;
