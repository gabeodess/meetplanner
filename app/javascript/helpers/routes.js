export default {
  newSession: '/sessions/new',
  newUser: '/users/new',
  events: '/events',
  editEvent: id => `/events/edit/${id}`,
  event: id => `/events/${id}`,
  newEvent: '/events/new',
  api: {
    events: '/api/v1/events',
    event: id => `/api/v1/events/${id}`,
  },
};
