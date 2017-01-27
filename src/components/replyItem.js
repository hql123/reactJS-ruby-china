import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router'
import moment from 'moment'
import '../assets/styles/replies.css'
class ReplyItem extends Component {
  static propTypes = {
    pathname: PropTypes.string.isRequired,
    reply: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      reply: this.props.reply,
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.reply.id !== this.state.reply.id) {
      this.setState({
        reply: nextProps.reply,
      })
    }
  }

  render() {
    const reply = this.state.reply;

    return (
      <div>
      {reply.deleted 
      ? <div className="reply reply-deleted" data-id={reply.id} id={"reply" + this.props.floor}>
          <div className="deleted text-center">{this.props.floor}楼 已删除</div>
        </div>
      : <div className='reply'>
          <div className="avatar">
            <Link to={'/users/'+reply.user.id}><img alt={reply.user.login} src={reply.user.avatar_url} style={{width: '48px', height: '48px', borderRadius: '24px'}}/></Link>
          </div>
          <div className="infos">
            <div className="info">
              <Link to={'/users/'+reply.user.id}>{reply.user.login}</Link> &nbsp;·  &nbsp;
              <a href={"#reply"+this.props.floor}>{'#'+this.props.floor}</a>  &nbsp;·&nbsp;  
              <span>{moment(reply.created_at).fromNow()}</span>
            </div>
            <div className="content">
              <div dangerouslySetInnerHTML={{__html: reply.body_html}} />
            </div>
          </div>
          <div className="operate-group">
            
          </div>
          
        </div>
        }
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
export default connect(mapStateToProps, mapDispatchToProps)(ReplyItem)
