import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import formatDate from '../helpers/formatDate';
import routes from '../helpers/routes';
import Loading from './Loading';

class Event extends React.Component {
  state = {}

  componentDidMount() {
    const { match } = this.props;
    axios.get(routes.api.event(match.params.id)).then(
      ({ data }) => this.setState({ event: data }),
    );
  }

  render() {
    const { event } = this.state;

    return (
      <React.Fragment>
        {event ? (
          <React.Fragment>
            <div className="my-5" style={{ height: 300, overflow: 'hidden' }}>
              <img
                src={`http://placekitten.com/${1200 + Math.round((Math.random() * 100))}/420`}
                className="img-fluid"
                alt="Responsive"
              />
            </div>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="h1">
                      {
                        formatDate(event.start_on)
                      }
                      {
                        event.end_on && ` - ${formatDate(event.end_on)}`
                      }


                    </div>
                    <h1>{event.title}</h1>
                    <p>
                      Hosted by:
                      {event.organizer}
                      {' '}
                      (
                      {event.email}
                      )
                    </p>
                    <p>
                      Sanction ID:
                      {event.sanction_id}
                    </p>
                  </div>
                  <div className="col-sm-6">
                    <p>
                      {formatDate(event.start_on, {
                        weekday: 'long', day: 'numeric', month: 'long',
                      })}

                      {
                        event.end_on && ` - ${formatDate(event.end_on, {
                          weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
                        })}`
                      }
                    </p>
                    <p>
                      {event.street}
                      {' '}
                      {event.city}
                      ,
                      {' '}
                      {event.state}
                      ,
                      {' '}
                      {event.zipcode}
                    </p>
                    <Link to={routes.newEventParticipant(event.id)} className="btn btn-success btn-block text-uppercase">Register</Link>
                    <Link to={routes.eventSessions(event.id)} className="btn btn-primary btn-block text-uppercase">View Session Info</Link>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <Loading />
        )}
      </React.Fragment>
    );
  }
}

Event.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Event;
