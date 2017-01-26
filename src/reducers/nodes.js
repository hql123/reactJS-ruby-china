const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: []
}

const nodes = (state = initialState, action) => {
  switch (action.type) {
    case 'INVALIDATE_NODES':
      return {
        ...state,
        didInvalidate: true
      }
    case 'REQUEST_NODES':
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case 'RECEIVE_NODES_SUCCESS':
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.nodes,
        lastUpdated: action.receivedAt
      }
    case 'RECEIVE_NODES_FAILURE':
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

const nodesFetchState = (state = { }, action) => {
  switch (action.type) {
    case 'INVALIDATE_NODES':
    case 'REQUEST_NODES':
    case 'RECEIVE_NODES_SUCCESS':
    case 'RECEIVE_NODES_FAILURE':
    
      return {
        ...state,
        nodes: nodes(state['nodes'], action)
      }
    default:
      return state
  }
}
module.exports = {nodesFetchState}
