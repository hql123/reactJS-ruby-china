const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: []
}
const selectedTab = (state = 'topics', action) => {
  switch (action.type) {
    case 'SELECT_TAB':
      return action.tab
    default:
      return state
  }
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
module.exports = {selectedTab, topicsByTab}
