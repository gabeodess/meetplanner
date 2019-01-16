import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';


const eventsReducer = () => [
  { eventName: '2019 Texas State Championship' }, { eventName: '2020 Spartakiad' },
];

const selectedEventReducer = (selectedEvent = null, action) => {
  if (action.type === 'EVENT_SELECTED') {
    return action.payload;
  }
  return selectedEvent;
};

export default combineReducers({
  events: eventsReducer,
  selectedEvent: selectedEventReducer,
});
