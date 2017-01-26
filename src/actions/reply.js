import {fetchData} from './fetchData';
//刷新列表
const invalidateReplies = topic_id => ({
  type: 'INVALIDATE_REPLIES',
  topic_id
})

//请求帖子列表开始
const requestReplies = topic_id => ({
  type: 'REQUEST_REPLIES',
  topic_id
})

const receiveReplies = (topic_id, json) => ({
  type: 'RECEIVE_REPLIES_SUCCESS',
  topic_id,
  replies: json.replies,
  receivedAt: Date.now()
})

const fetchReplies = (topic_id) => dispatch => {
  dispatch(requestReplies(topic_id))
  return fetchData('/topics/'+topic_id+'/replies', '?limit=150').then(response => {
    dispatch(receiveReplies(topic_id, response))
  }).catch(error => {
    dispatch({
      type: 'RECEIVE_REPLIES_FAILURE',
      error: error,
    })
    
  })
  
}

const shouldFetchReplies = (state, topic_id) => {
  
  const replies = state.repliesByTopic[topic_id]
  if (!replies) {
    return true
  }
  if (replies.isFetching) {
    return false
  }
  return replies.didInvalidate
}

const fetchRepliesIfNeeded = (topic_id) => (dispatch, getState) => {
  if (shouldFetchReplies(getState(), topic_id)) {
    return dispatch(fetchReplies(topic_id))
  }
}

module.exports = {
  invalidateReplies,
  fetchRepliesIfNeeded,
}
