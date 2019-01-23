import merge from 'lodash.merge';
import { BAR_UPDATE, BAR_DESTROY } from '../actions';

const barReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState;

  switch (action.type) {
    case BAR_UPDATE.RECEIVE:
      return merge({}, state, { [action.bar.id]: action.bar });
    case BAR_DESTROY.RECEIVE:
      nextState = merge({}, state);
      delete nextState[action.bar.id];
      return nextState;
    default:
      return state;
  }
};

export default barReducer;
