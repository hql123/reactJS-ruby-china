var { combineReducers } = require('redux');
import { routerReducer } from 'react-router-redux';
const topics = require('./topics');
const nodes = require('./nodes');
const replies = require('./replies')
module.exports = combineReducers({
  ...topics,
  ...nodes,
  ...replies,
  routing: routerReducer,
});
