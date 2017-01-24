import React, { Component, PropTypes } from 'react'
import '../assets/styles/topics.css'
import { connect } from 'react-redux'
import { fetchTopicsIfNeeded, invalidateTab } from '../actions'
import { Spin, Alert, Pagination } from 'antd';
import TopicItem from './topicItem.js';
import { browserHistory } from 'react-router'

class Topics extends Component {
  static propTypes = {
    pathname: PropTypes.string.isRequired,
    topics: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    fetchTopicsIfNeeded: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
  
    this.state = {
      current: this.props.pathname,  
      isFetching: this.props.isFetching, 
      page: Number(this.props.page)  
    };
    this.handleChangePage = this.handleChangePage.bind(this);
  }
  handleChangePage(page){
    const { pathname } = this.props
    browserHistory.push({
      pathname: pathname,
      query: { page: page }
    });
  }
  componentDidMount() {
    const { fetchTopicsIfNeeded, search } = this.props
    fetchTopicsIfNeeded(this.props.pathname, search);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.pathname !== this.state.current || nextProps.isFetching !== this.state.isFetching || Number(nextProps.page) !== this.state.page) {
      const { fetchTopicsIfNeeded, invalidateTab } = nextProps;
      this.setState({
        current: nextProps.pathname,
        isFetching: nextProps.isFetching, 
        page: Number(nextProps.page)      
      })
      if (nextProps.pathname !== this.state.current || Number(nextProps.page) !== this.state.page) {
        invalidateTab(nextProps.pathname);
        fetchTopicsIfNeeded(nextProps.pathname, nextProps.search);
      }
    }
  }
  render() {
    const {topics, isFetching, error } = this.props
    const isEmpty = topics.length === 0;
    const errorMsg = error;
    const container = (
      isEmpty || errorMsg ? <Alert message="数据加载失败，真相只有一个！" description="请检查你的网络状态" type="info" />
        : <div className="topics">
            {topics.map((topic, i) =>
              <TopicItem key={topic.id} topic={topic} />
            )}
            <div className="topics-pagination"><Pagination onChange={this.handleChangePage} total={700} current={this.state.page} /></div>
          </div>
      
    );
    return (
      <Spin spinning={isFetching} tip="Loading...">{container}</Spin>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const {pathname, search, query} = state.routing.locationBeforeTransitions;
  const page = query.page || 1
  const {topicsByTab} = state
  const {
    isFetching,
    lastUpdated,
    items:topics,
    error
  } = topicsByTab[pathname] || {
    isFetching: true,
    items: []
  }

  return {
    pathname,
    page,
    search,
    topics,
    isFetching,
    lastUpdated,
    error
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchTopicsIfNeeded: (selectedTab, search) => dispatch(fetchTopicsIfNeeded(selectedTab, search)),
    invalidateTab: (selectedTab) => dispatch(invalidateTab(selectedTab)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Topics)
