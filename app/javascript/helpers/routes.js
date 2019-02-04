export default {
  newEventParticipant: id => `/events/${id}/athletes/new`,
  newSession: '/sessions/new',
  newUser: '/users/new',
  events: '/events',
  eventSessions: id => `/events/${id}/sessions`,
  editEvent: id => `/events/edit/${id}`,
  manageEvent: id => `/events/manage/${id}`,
  event: id => `/events/${id}`,
  newEvent: '/events/new',
  searchEvents: '/events/search',
  api: {
    events: '/api/v1/events',
    event: id => `/api/v1/events/${id}`,
    searchEvents: '/api/v1/events/search',
    closeEvent: id => `/api/v1/events/${id}/close`,
    openEvent: id => `/api/v1/events/${id}/open`,
  },
};
