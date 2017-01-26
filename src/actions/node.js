import {fetchData} from './fetchData';
const invalidateNodes = () => ({
  type: 'INVALIDATE_NODES',
})

const requestNodes = () => ({
  type: 'REQUEST_NODES',
})

const receiveNodes = (json) => ({
  type: 'RECEIVE_NODES_SUCCESS',
  nodes: json.nodes,
  receivedAt: Date.now()
})

const fetchNodes = (tab) => dispatch => {
  dispatch(requestNodes())
  return fetchData(tab).then(response => {
    dispatch(receiveNodes(response))
  }).catch(error => {
    dispatch({
      type: 'RECEIVE_NODES_FAILURE',
      error: error,
    })
    
  })
  
}


const shouldFetchNodes = (state) => {
  const nodes = state.nodesFetchState['nodes']
  if (!nodes) {
    return true
  }
  //对象存在且正在获取新数据中
  if (nodes.isFetching) {
    return false
  }
  return nodes.didInvalidate
}

const fetchNodesIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchNodes(getState())) {
    return dispatch(fetchNodes('/nodes'))
  }
}


module.exports = {
  invalidateNodes,
  requestNodes,
  receiveNodes,
  fetchNodes,
  fetchNodesIfNeeded,
}