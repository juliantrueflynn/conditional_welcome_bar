import { SESSION } from '../actions';

const _defaultState = null;

const sessionReducer = (state = _defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case SESSION:
      return action.session;
    default:
      return state;
  }
};

export default sessionReducer;
