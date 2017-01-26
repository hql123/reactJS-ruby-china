

// const loginActions = require('./login');
// const scheduleActions = require('./schedule');
// const filterActions = require('./filter');
// const notificationActions = require('./notifications');
// const configActions = require('./config');
const topicActions = require('./topic');
const nodeActions = require('./node');
const replyActions = require('./reply');

module.exports = {
  ...topicActions,
  ...nodeActions,
  ...replyActions,
  //...loginActions,
  // ...scheduleActions,
  // ...filterActions,
  // ...notificationActions,
  // ...configActions,
};