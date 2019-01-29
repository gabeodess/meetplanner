import React from 'react';
import axios from 'axios';
import csrfToken from '../helpers/csrfToken';
import routes from '../helpers/routes';
import history from '../helpers/history';
import Field from './forms/Field';

class EventsNew extends React.Component {
  state = { errors: {} }

  onSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/v1/events', $('form#event-form').serialize()).then(
      () => { history.push(routes.events); },
      (error) => {
        const { status, data } = error.response;
        if (status === 422) {
          this.setState(data);
        }
      },
    );
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <h1>Create an Event</h1>
        <form onSubmit={this.onSubmit} id="event-form" className="text-left">
          <input type="hidden" name="authenticity_token" value={csrfToken()} />
          <Field name="title" scope="event" label="Event Title" errors={errors} required />
          <Field name="organizer" scope="event" errors={errors} required />
          <Field name="sanction_id" scope="event" label="USAW Sanction ID" errors={errors} required />
          <Field name="fee" scope="event" errors={errors} required type="number" min="0.01" step="0.01" />
          <Field tag="textarea" name="description" scope="event" errors={errors} required />
          <Field name="start_on" type="date" scope="event" errors={errors} required />
          <Field name="end_on" type="date" scope="event" errors={errors} />
          <Field name="street" scope="event" errors={errors} required />
          <Field name="city" scope="event" errors={errors} required />
          <Field name="state" scope="event" errors={errors} required />
          <Field name="zipcode" scope="event" errors={errors} required />
          <Field name="phone" type="tel" scope="event" errors={errors} required />
          <Field name="email" type="email" scope="event" errors={errors} required />
          <div className="text-center">
            <input type="submit" value="Create Event" className="btn btn-primary btn-large text-uppercase" />
          </div>
        </form>
      </div>
    );
  }
}

export default EventsNew;
