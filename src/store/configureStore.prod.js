
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

import { routerMiddleware, browserHistory } from 'react-router-redux'
const middlewares = [thunk, routerMiddleware(browserHistory)];
const configureStore = initialState => createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middlewares)
)

export default configureStore
