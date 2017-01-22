var { combineReducers } = require('redux');
import { routerReducer } from 'react-router-redux';
const topics = require('./topics');
module.exports = combineReducers({
  ...topics,
  routing: routerReducer,
});
