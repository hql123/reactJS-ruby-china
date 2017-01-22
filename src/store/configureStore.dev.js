import {applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import DevTools  from '../containers/devTools';
import reducers from '../reducers';
const logger = createLogger();
const middlewares = [thunk, logger];
const configureStore = (initialState) => {
  const store = createStore(
      reducers,
      initialState,
      compose(
        applyMiddleware(...middlewares),
        DevTools.instrument()
      )
  )
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = reducers.default
      store.replaceReducer(nextReducer)
    })
  }
  return store;
}

module.exports = configureStore;