import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import routes from '../helpers/routes';
import csrfToken from '../helpers/csrfToken';

class EventsIndex extends React.Component {
  state = { events: [] }

  componentDidMount() {
    this.fetchEvents();
  }

  onClickDelete(event, id) {
    event.preventDefault();
    axios.delete(routes.api.event(id), { data: { authenticity_token: csrfToken() } }).then(() => {
      this.fetchEvents();
    });
  }

  fetchEvents() {
    axios.get(routes.api.events).then(({ data }) => {
      this.setState({ events: data });
    });
  }

  renderList() {
    const { events } = this.state;

    return (
      <table>
        <tbody>
          {
          events.map(event => (
            <tr key={event.id}>
              <td>{event.title}</td>
              <td>
                <Link className="btn btn-link" to={routes.editEvent(event.id)}>Edit</Link>
                <button type="button" className="btn btn-link" onClick={e => this.onClickDelete(e, event.id)}>Delete</button>
              </td>
            </tr>
          ))
        }
        </tbody>
      </table>
    );
  }

  render() {
    const { events } = this.state;

    return (
      <div className="text-center">
        <h2>My Events</h2>
        {events.length > 0 ? (
          this.renderList()
        ) : (
          <p>
            You haven&apos;t created any events yet!
            Click &quot;Create Event&quot; to get started.
          </p>
        )}
        <Link to={routes.newEvent} className="btn btn-primary btn-large text-uppercase">+ Create Event</Link>
      </div>
    );
  }
}

export default EventsIndex;
