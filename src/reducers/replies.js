const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: []
}
const replies = (state = initialState, action) => {
  switch (action.type) {
    case 'INVALIDATE_REPLIES':
      return {
        ...state,
        didInvalidate: true
      }
    case 'REQUEST_REPLIES':
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case 'RECEIVE_REPLIES_SUCCESS':
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.replies,
        lastUpdated: action.receivedAt
      }
    case 'RECEIVE_REPLIES_FAILURE':
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

const repliesByTopic = (state = { }, action) => {
  switch (action.type) {
    case 'INVALIDATE_REPLIES':
    case 'RECEIVE_REPLIES_SUCCESS':
    case 'RECEIVE_REPLIES_FAILURE':
    case 'REQUEST_REPLIES':
      return {
        ...state,
        [action.topic_id]: replies(state[action.topic_id], action)
      }
    default:
      return state
  }
}

module.exports = {repliesByTopic}
