import {fetchData} from './fetchData';
//显示列表
const switchTab = tab => ({
  type: 'SELECT_TAB',
  tab
});

//刷新列表
const invalidateTab = tab => ({
  type: 'INVALIDATE_TAB',
  tab
})

//请求帖子列表开始
const requestTopics = tab => ({
  type: 'REQUEST_TOPICS',
  tab
})

//接收帖子列表
const receiveTopics = (tab, json) => ({
  type: 'RECEIVE_TOPICS_SUCCESS',
  tab,
  topics: json.topics,
  receivedAt: Date.now()
})

//请求帖子
const fetchTopics = (tab) => dispatch => {
  dispatch(requestTopics(tab))
  return fetchData(tab).then(response => {
    dispatch(receiveTopics(tab, response))
  }).catch(error => {
    dispatch({
      type: 'RECEIVE_TOPICS_FAILURE',
      error: error,
    })
    
  })
  
}


const shouldFetchTopics = (state, tab) => {
  //当前状态树中挂着一个topicsByTab的分支
  //解析这个topicsByTab的分支对象，对象中作为tab的key是个变量，其value是另一个state对象
  const topics = state.topicsByTab[tab]
  if (!topics) {
    return true
  }
  //对象存在且正在获取新数据中
  if (topics.isFetching) {
    return false
  }
  return topics.didInvalidate
}

//是否需要更新帖子
const fetchTopicsIfNeeded = tab => (dispatch, getState) => {
  if (shouldFetchTopics(getState(), tab)) {
    return dispatch(fetchTopics(tab))
  }
}

module.exports = {
  switchTab,
  invalidateTab,
  requestTopics,
  receiveTopics,
  fetchTopics,
  fetchTopicsIfNeeded
}