import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router'
import moment from 'moment'
moment.locale('zh-CN');
import '../assets/styles/topics.css'
class TopicItem extends Component {
  static propTypes = {
    pathname: PropTypes.string.isRequired,
    topic: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      topic: this.props.topic,
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.topic.id !== this.state.topic.id) {
      this.setState({
        topic: nextProps.topic,
      })
    }
  }

  render() {
    const topic = this.state.topic;

    return (
      <div className='topic'>
        <div className='topic-avatar'>
        <Link to={'/users/'+topic.user.id}><img alt={topic.user.login} src={topic.user.avatar_url} style={{width: '48px', height: '48px', borderRadius: '24px'}}/></Link>
        </div>
        <div className='topic-infos'>
          <div className='topic-title'>
          <Link to={'/topics/'+topic.id}>
          <span className="topic-node">{topic.node_name}</span>
          {topic.title}
          {
            topic.excellent === 1 && <div type='smile-o' style={{color: 'red',marginLeft: '5px',marginRight: '5px',lineHeight: '30px'}}/>
          }
          
          </Link>
          </div>
          <div className='topic-info'>
          <Link to={'/users/'+topic.user.id}>{topic.user.login}</Link>
          {topic.replies_count === 0
            ? <span> · 发布于 {moment(topic.updated_at).fromNow()} </span>
            : <span> · 最后由 <Link to={'/users/'+topic.last_reply_user_id}>{topic.last_reply_user_login}</Link> 回复于 {moment(topic.replied_at).fromNow()} </span>
          }
          </div>
          
        </div>
        <div className='topic-replies-count'>
        <span className='span-replies'>{topic.replies_count}</span>
        </div>
      </div>
      
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let {pathname, hash} = state.routing.locationBeforeTransitions;
  if (hash.indexOf('#') > -1) {
    pathname = hash.slice(1).split('?')[0];
  }
  return {
    pathname,    
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopicItem)
