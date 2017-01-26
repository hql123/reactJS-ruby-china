const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: []
}
const topicState = {
  isFetching: false,
  topic: {},
  meta: {},
}

const topics = (state = initialState, action) => {
  switch (action.type) {
    case 'INVALIDATE_TAB':
      return {
        ...state,
        didInvalidate: true
      }
    case 'REQUEST_TOPICS':
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case 'RECEIVE_TOPICS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.topics,
        lastUpdated: action.receivedAt
      }
    case 'RECEIVE_TOPICS_FAILURE':
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        err: action.error
      }
    default:
      return state
  }
}
const topic = (state = topicState, action) => {
  switch(action.type) {
    case 'REQUEST_TOPIC':
      return {
        ...state,
        isFetching: true,
      }
    case 'RECEIVE_TOPIC_SUCCESS':
      return {
        ...state,
        isFetching: false,
        topic: action.topic,
        meta: action.meta,
      }
    case 'RECEIVE_TOPIC_FAILURE':
      return {
        ...state,
        isFetching: false,
        err: action.error
      }
    default:
      return state
  }
}
const topicsByTab = (state = { }, action) => {
  switch (action.type) {
    case 'INVALIDATE_TAB':
    case 'RECEIVE_TOPICS_SUCCESS':
    case 'RECEIVE_TOPICS_FAILURE':
    case 'REQUEST_TOPICS':
      return {
        ...state,
        [action.tab]: topics(state[action.tab], action)
      }
    default:
      return state
  }
}
const getTopic = (state = { }, action) => {
  switch (action.type) {
    case 'RECEIVE_TOPIC_SUCCESS':
    case 'RECEIVE_TOPIC_FAILURE':
    case 'REQUEST_TOPIC':
      return {
        ...state,
        [action.topic_id]: topic(state[action.topic_id], action)
      }
    default:
      return state
  }
}
module.exports = {topicsByTab, getTopic}
