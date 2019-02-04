import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import routes from '../helpers/routes';
import Loading from './Loading';

class EventsSearch extends React.Component {
  state = {}

  componentDidMount() {
    this.fetchEvents();
  }

  onSortChange = () => {
    this.fetchEvents();
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.fetchEvents();
  }

  fetchEvents() {
    axios.get([routes.api.searchEvents, $('form').serialize()].join('?')).then(
      ({ data }) => this.setState({ events: data }),
    );
  }

  render() {
    const { events } = this.state;

    if (events === undefined) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <h1 className="text-center">All Events</h1>
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col-sm-7">
              <div className="row">
                <div className="col-sm-5">
                  <input type="text" name="q[title_cont]" placeholder="search" className="form-control" />
                </div>
                <div className="col-sm-5">
                  <select name="q[s]" className="form-control" onChange={this.onSortChange}>
                    <option value="start_on asc">sort by date</option>
                    <option value="title asc">sort by title</option>
                    <option value="city asc">sort by city</option>
                  </select>
                </div>
                <div className="col-sm-2">
                  <input type="submit" className="btn btn-primary" value="Search" />
                </div>
              </div>
            </div>
          </div>
        </form>
        <table className="table mt-5">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Location</th>
              <th>Registration Status</th>
            </tr>
          </thead>
          <tbody>
            {(events.length === 0) && (
            <tr>
              <td colSpan="4">
                <div className="text-center">
                    No results found.
                </div>
              </td>
            </tr>
            )}
            {events.map(event => (
              <tr key={event.id}>
                <td><Link to={routes.event(event.id)}>{event.title}</Link></td>
                <td>{event.start_on}</td>
                <td>
                  {event.city}
,
                  {' '}
                  {event.state}
                </td>
                <td>{event.closed_at ? 'Closed' : 'Open'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default EventsSearch;
