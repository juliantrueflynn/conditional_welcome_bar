import { SESSION } from '../actions';

const _defaultState = null;

const sessionReducer = (state = _defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case SESSION.REQUEST: {
      return { shopifyDomain: action.session.shop };
    }
    case SESSION.RECEIVE: {
      return { ...action.session };
    }
    default:
      return state;
  }
};

export default sessionReducer;
