import { actionTypes, actionCreator } from '../util/actionsUtil';
import { apiCreate } from '../util/apiUtil';

export const SESSION = actionTypes('SESSION');
export const BAR_UPDATE = actionTypes('BAR_UPDATE');
export const BAR_DESTROY = actionTypes('BAR_DESTROY');

export const updateSession = {
  request: session => actionCreator(SESSION.REQUEST, { session }),
  receive: session => actionCreator(SESSION.RECEIVE, { session }),
  failure: errors => actionCreator(SESSION.FAILURE, { errors }),
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

export const signUp = session => dispatch => {
  dispatch(updateSession.request(session));

  return apiCreate(`/login`, session).then(
    json => {
      console.log('thenjson', json);
      return dispatch(updateSession.receive(json))
    },
    errors => {
      console.log('thenerr', errors);
      return dispatch(updateSession.failure(errors));
    }
  ).catch(errors => {
    console.log('errors', errors);
    return dispatch(updateSession.failure(errors))
  })
};
