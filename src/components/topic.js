import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router'
import {fetchTopicIfNeeded, fetchRepliesIfNeeded, invalidateReplies} from '../actions'
import SiderBar from './siderbar'
import '../assets/styles/topics.css'
import '../assets/styles/markdown.css'
import moment from 'moment'
import ReplyItem from './replyItem.js';
import {Alert, ProgressBar, Row, Col, Grid, Panel} from 'react-bootstrap'
import Font from 'react-fontawesome';

class Topic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: this.props.pathname,
      topic: this.props.topic,
      topicIsFetching: this.props.topicIsFetching,
      topicError: this.props.topicError,
      replies: this.props.replies,
      repliesIsFetching: this.props.repliesIsFetching,
      repliesError: this.props.replies,
    }
  }
  componentDidMount() {
    const { fetchTopicIfNeeded, fetchRepliesIfNeeded, invalidateReplies } = this.props
    fetchTopicIfNeeded(this.props.topic_id);
    invalidateReplies(this.props.topic_id);
    fetchRepliesIfNeeded(this.props.topic_id)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.topic !== this.state.topic) {
      this.setState({
        topic: nextProps.topic,
      })
    }
    if (nextProps.replies.length !== this.state.replies.length) {
      this.setState({
        replies: nextProps.replies,
      })
    }
    if (nextProps.topicIsFetching !== this.state.topicIsFetching) {
      this.setState({
        topicIsFetching: nextProps.topicIsFetching,
        topic: nextProps.topic,
      })
    }
    if (nextProps.repliesIsFetching !== this.state.repliesIsFetching) {
      this.setState({
        repliesIsFetching: nextProps.repliesIsFetching,
        replies: nextProps.replies,
      })
    }

    if (nextProps.topicError !== this.state.topicError) {
      this.setState({
        topicError: nextProps.topicError,
      })
    }
    if (nextProps.repliesError !== this.state.repliesError) {
      this.setState({
        repliesError: nextProps.repliesError,
      })
    }

    if (nextProps.pathname !== this.state.current) {
      const { fetchTopicIfNeeded, invalidateReplies, fetchRepliesIfNeeded} = nextProps
      fetchTopicIfNeeded(nextProps.topic_id);
      invalidateReplies(this.props.topic_id);
      fetchRepliesIfNeeded(this.props.topic_id)
      this.state = {
        current: nextProps.pathname,
        replies: nextProps.replies,
      }
    }
  }
  render() {
    const {topic, topicIsFetching, topicError, replies, repliesError, repliesIsFetching} = this.state;
    const repliesUserContainer = (
      topic ? (topic.replies_count === 0 ? '' : <span> · 最后由 <Link to={'/users/'+topic.last_reply_user_id}>{topic.last_reply_user_login}</Link> 回复于 {moment(topic.replied_at).fromNow()} </span>): ''
    );
    const isTopicEmpty = topic ? false : true
    const isRepliesEmpty = replies.length === 0 ? true : false;
    const title = (
      <div className="detail-header">
        <div className="header-infos">
          <div className="header-title"><Link to={"/topic?node_id" + topic.node_id}>{topic.node_name}</Link>{topic.title}</div>
          <div className="header-info">
            <Link to={topic.user ? '/users/'+topic.user.id : ''}>{topic.user ? topic.user.login : ''}</Link>
            <span> · 发布于 {moment(topic.updated_at).fromNow()} </span>
            {repliesUserContainer}
            <span> · {topic.hits} 次阅读</span>
          </div>
        </div>
        <div className="header-avatar">
          <Link to={topic.user ? '/users/'+topic.user.id : ''}><img alt={topic.user? topic.user.login : ''} src={topic.user ? topic.user.avatar_url : ''} style={{width: '48px', height: '48px', borderRadius: '24px'}}/></Link>
        </div>
      </div>
    );
    const footer = (
      <div>
      <Font name="heart" /><span> <strong>{topic.likes_count}</strong> 个赞</span>
      </div>
    );
    const container = (
      isTopicEmpty || topicError 
      ? <Alert bsStyle="warning" ><strong>数据加载失败，真相只有一个！</strong>请检查你的网络状态</Alert>
      : <Panel className="topic-detail" header={title} footer={footer}>
          <div className="markdown">
          <article dangerouslySetInnerHTML={{ __html: topic.body_html}}></article>
          </div>
        </Panel>
    );
    const repliesContainer = (
      repliesError
      ? <Alert bsStyle="warning" ><strong>数据加载失败，真相只有一个！</strong>请检查你的网络状态</Alert>
      : (isRepliesEmpty ? <Alert bsStyle="info" ><strong>暂无回复哟</strong></Alert>
        :<div className="replies markdown">
          {replies.map((reply, i) =>
            <ReplyItem key={i} floor={i+1} reply={reply} />
          )}
         </div>
        )
    );
    return (
      <Grid>
      <Row>
        <Col md={9}>
        {topicIsFetching
          ? <div style={{width: '80%', margin: '0 auto'}}><ProgressBar active now={45} label="努力加载中"/></div>
          : container
        }
        
        <div className="topic-replies">
          <div className="replies-header">共收到 <strong>{topic ? topic.replies_count : 0}</strong> 条回复</div>
          <div className="replies-body">
            {repliesIsFetching
              ? <div style={{width: '80%', margin: '0 auto'}}><ProgressBar active now={45} label="努力加载中"/></div>
              : repliesContainer
            }
          </div>
        </div>
        </Col>
        <Col md={3}><SiderBar /></Col>
      </Row>
      </Grid>
    );
  }

}
const mapStateToProps = (state, ownProps) => {
  let {pathname, hash} = state.routing.locationBeforeTransitions;
  if (hash.indexOf('#') > -1) {
    pathname = hash.slice(1).split('?')[0];
  }
  const topic_id = pathname.slice(8);
  const {getTopic, repliesByTopic} = state
  const {
    isFetching: topicIsFetching,
    topic,
    meta,
    error: topicError
  } = getTopic[topic_id] || {
    isFetching: true,
    topic: {},
    meta: {}
  }
  const {
    isFetching: repliesIsFetching,
    items: replies,
    error: repliesError,
  } = repliesByTopic[topic_id] || {
    isFetching: true,
    items: [],
  }
  return {
    pathname,  
    topic_id,
    topicIsFetching,
    topic,
    meta,
    topicError,
    repliesIsFetching,
    replies,
    repliesError
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchTopicIfNeeded:(topic_id) => dispatch(fetchTopicIfNeeded(topic_id)),
    fetchRepliesIfNeeded: (topic_id) => dispatch(fetchRepliesIfNeeded(topic_id)),
    invalidateReplies: (topic_id) => dispatch(invalidateReplies(topic_id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Topic)

