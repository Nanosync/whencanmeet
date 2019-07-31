import { combineReducers } from 'redux';
import meetingReducer from './MeetingReducer';
import errorReducer from './ErrorReducer';

export default combineReducers({
  meetings: meetingReducer,
  errors: errorReducer
});
