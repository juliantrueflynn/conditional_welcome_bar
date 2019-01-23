import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger';
import rootReducer from '../reducers'

const configureStore = (preloadedState = {}) => {
  const middlewares = [loggerMiddleware, thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  return createStore(rootReducer, preloadedState, middlewareEnhancer);
}

export default configureStore;

