
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
const middlewares = [thunk];

const configureStore = initialState => createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middlewares)
)

export default configureStore
