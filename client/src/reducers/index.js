import { combineReducers } from 'redux';
import session from './sessionReducer';
import bars from './barReducer';
import isLoading from './isLoadingReducer';

const rootReducer = combineReducers({
  session,
  bars,
  isLoading,
});

export default rootReducer;
