import { SESSION } from '../actions';

const _defaultState = {
  session: false,
};

const isLoadingReducer = (state = _defaultState, action) => {
  switch (action.type) {
    case SESSION.REQUEST:
      return { ...state, session: true };
    case SESSION.RECEIVE:
      return { ...state, session: false };
    default:
      return state;
  }
};

export default isLoadingReducer;
