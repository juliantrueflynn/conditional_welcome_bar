import { actionTypes, actionCreator } from '../util/actionsUtil';
import { apiCreate, apiFetch } from '../util/apiUtil';

export const SESSION = actionTypes('SESSION');
export const BAR_INDEX = actionTypes('BAR_INDEX');
export const BAR_UPDATE = actionTypes('BAR_UPDATE');
export const BAR_DESTROY = actionTypes('BAR_DESTROY');

export const updateSession = {
  request: session => actionCreator(SESSION.REQUEST, { session }),
  receive: session => actionCreator(SESSION.RECEIVE, { session }),
  failure: errors => actionCreator(SESSION.FAILURE, { errors }),
};

export const fetchBars = {
  request: shop => actionCreator(BAR_INDEX.REQUEST, { shop }),
  receive: bars => actionCreator(BAR_INDEX.RECEIVE, { bars }),
  failure: errors => actionCreator(BAR_INDEX.FAILURE, { errors }),
};

export const updateBar = {
  request: bar => actionCreator(BAR_UPDATE.REQUEST, { bar }),
  receive: bar => actionCreator(BAR_UPDATE.RECEIVE, { bar }),
  failure: errors => actionCreator(BAR_UPDATE.FAILURE, { errors }),
};

export const destroyBar = {
  request: bar => actionCreator(BAR_DESTROY.REQUEST, { bar }),
  receive: bar => actionCreator(BAR_DESTROY.RECEIVE, { bar }),
  failure: errors => actionCreator(BAR_DESTROY.FAILURE, { errors }),
};

export const fetchBarsIndex = shop => dispatch => {
  dispatch(fetchBars.request(shop));

  return apiFetch(`shops/${shop}/bars`).then(
    json => dispatch(fetchBars.receive(json)),
    errors => dispatch(fetchBars.failure(errors))
  ).catch(errors => dispatch(fetchBars.failure(errors)))
};

export const signUp = session => dispatch => {
  dispatch(updateSession.request(session));

  return apiCreate(`session`, session).then(
    json => dispatch(updateSession.receive(json)),
    errors => dispatch(updateSession.failure(errors))
  ).catch(errors => dispatch(updateSession.failure(errors)))
};
