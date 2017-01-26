import {fetchData} from './fetchData';
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
const requestTopic = topic_id => ({
  type: 'REQUEST_TOPIC',
  topic_id
})

//接收帖子列表
const receiveTopics = (tab, json) => ({
  type: 'RECEIVE_TOPICS_SUCCESS',
  tab,
  topics: json.topics,
  receivedAt: Date.now()
})

const receiveTopic = (topic_id, json) => ({
  type: 'RECEIVE_TOPIC_SUCCESS',
  topic_id,
  topic: json.topic,
  meta: json.meta,
  receivedAt: Date.now()
})

//请求帖子
const fetchTopics = (tab, search) => dispatch => {
  dispatch(requestTopics(tab))
  return fetchData(tab,search).then(response => {
    dispatch(receiveTopics(tab, response))
  }).catch(error => {
    dispatch({
      type: 'RECEIVE_TOPICS_FAILURE',
      error: error,
    })
    
  })
  
}

const fetchTopic = (topic_id) => dispatch => {
  dispatch(requestTopic(topic_id))
  return fetchData('/topics/'+topic_id).then(response => {
    dispatch(receiveTopic(topic_id, response))
  }).catch(error => {
    dispatch({
      type: 'RECEIVE_TOPIC_FAILURE',
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

const shouldFetchTopic = (state, topic_id) => {
  const topic = state.getTopic[topic_id]
  if (!topic) {
    return true
  }
  //对象存在且正在获取新数据中
  if (topic.isFetching) {
    return false
  }
  return true
}

//是否需要更新帖子
const fetchTopicsIfNeeded = (tab, search) => (dispatch, getState) => {
  if (shouldFetchTopics(getState(), tab)) {
    return dispatch(fetchTopics(tab, search))
  }
}
const fetchTopicIfNeeded = (topic_id) => (dispatch, getState) => {
  if (shouldFetchTopic(getState(), topic_id)) {
    return dispatch(fetchTopic(topic_id))
  }
}

module.exports = {
  invalidateTab,
  requestTopics,
  receiveTopics,
  fetchTopics,
  fetchTopicsIfNeeded,
  requestTopic,
  receiveTopic,
  fetchTopic,
  fetchTopicIfNeeded,
}