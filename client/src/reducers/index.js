import { combineReducers } from 'redux';
import session from './sessionReducer';
import bars from './barReducer';

const rootReducer = combineReducers({
  session,
  bars,
});

export default rootReducer;
