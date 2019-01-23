import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger';
import rootReducer from '../reducers'

const configureStore = (preloadedState = {}) => {
  const middlewareEnhancer = applyMiddleware(thunkMiddleware, loggerMiddleware);

  return createStore(rootReducer, preloadedState, middlewareEnhancer);
}

export default configureStore;

