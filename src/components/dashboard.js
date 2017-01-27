import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import '../assets/styles/dashboard.css'
import {Row, Col, Icon} from 'antd'
import {Link} from 'react-router'
import { fetchTopicsIfNeeded, invalidateTab } from '../actions'
import { Spin, Alert } from 'antd';
import TopicItem from './topicItem.js';
import Node from './nodeItem';

const hotCities = ["北京", "上海", "深圳", "杭州", "成都", "广州", "武汉", "西安", "南京", "大连", "长沙", "苏州"];
class Dashboard extends Component {
  static propTypes = {
    pathname: PropTypes.string.isRequired,
    topics: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    fetchTopicsIfNeeded: PropTypes.func.isRequired,
    nodes: PropTypes.array.isRequired,
  }
  constructor(props) {
    super(props);
  
    this.state = {
      current: this.props.pathname,  
      nodes: this.props.nodes,
      isFetching: this.props.isFetching, 
    };
  }
  componentDidMount() {
    const { fetchTopicsIfNeeded, search } = this.props
    fetchTopicsIfNeeded('/topics/popular', search);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.nodes.length > 0 && nextProps.nodes.length !== this.state.nodes.length) {
      this.setState({
        nodes: nextProps.nodes,
      })
    }
    if (nextProps.pathname !== this.state.current || nextProps.isFetching !== this.state.isFetching) {
      const { fetchTopicsIfNeeded, invalidateTab } = nextProps;
      this.setState({
        current: nextProps.pathname,
        isFetching: nextProps.isFetching,  
      })
      if (nextProps.pathname !== this.state.current) {
        invalidateTab('/topics/popular');
        fetchTopicsIfNeeded('/topics/popular', nextProps.search);
      }
    }
  }
  render() {
    const {topics, error } = this.props
    const isEmpty = topics.length === 0;
    const errorMsg = error;
    let nodes = this.state.nodes.group(item => item.section_name);
    const container = (
      isEmpty || errorMsg ? <Alert message="数据加载失败，真相只有一个！" description="请检查你的网络状态" type="info" />
        : topics.map((topic, i) =>
          i < 20 
          ? <Col key={'topic_' + i} span={12} className="topics_group">
              <TopicItem topic={topic} />
            </Col>
          : '')
          
    );
    return (
      <div className="dashboard">
        <Row className="dashboard-row">
          <Col span={24}>
            <div className="dashboard-main">
              <div className="dashboard-logo"><img alt="dashboard-logo" src="https://twemoji.b0.upaiyun.com/2/svg/1f381.svg" style={{width: '55px'}} /></div>
              <div className="dashboard-tip">
                <div style={{fontSize: '15px'}}>Ruby China 官方 <a href="https://gems.ruby-china.org" target="_blank">RubyGems 镜像</a>、<Link to="/wiki/ruby-mirror">Ruby 镜像</Link> 正式上线！</div>
                <div><code style={{padding: '4px 10px'}}>gem source -a https://gems.ruby-china.org</code></div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="dashboard-row" style={{background: 'transparent'}} type="flex" justify="space-between">
          <Col span={5}>
            <div className="dashboard-item">
              <div className="dashboard-item-body"><Link to="/topics"><Icon type="message" style={{color: '#F86334'}}/></Link></div>
              <div className="dashboard-item-font"><Link to="/topics">Ruby 社区<Icon type="arrow-right"/></Link></div>
            </div>
          </Col>
          <Col span={5}>
            <div className="dashboard-item">
              <div className="dashboard-item-body"><Link to="/wiki"><Icon type="chrome" style={{color: '#FFD52F'}}/></Link></div>
              <div className="dashboard-item-font"><Link to="/wiki">技术文档<Icon type="arrow-right" /></Link></div>
            </div>
          </Col>
          <Col span={5}>
            <div className="dashboard-item">
              <div className="dashboard-item-body"><Link to="/jobs"><Icon type="team" style={{color: '#317DDA'}}/></Link></div>
              <div className="dashboard-item-font"><Link to="/jobs">招聘与求职<Icon type="arrow-right"/></Link></div>
            </div>
          </Col>
          <Col span={5}>
            <div className="dashboard-item">
              <div className="dashboard-item-body"><Link to="/topics/popular"><Icon type="smile-o" style={{color: '#3BD54E'}}/></Link></div>
              <div className="dashboard-item-font"><Link to="/">精华文章<Icon type="arrow-right"/></Link></div>
            </div>
          </Col>
        </Row>
        <Row className="dashboard-row">
          <Col span={24}>
            <div className="panel-title">社区精华帖</div>
            <Row className="panel-body">
              <Spin spinning={this.state.isFetching} tip="Loading...">{container}</Spin>
            </Row>
            <Row className="panel-footer">
            <Link to='/topics/popular' >查看更多精华帖...</Link>
            </Row>
          </Col>
        </Row>
        <Row className="dashboard-row">
          <Col span={24}>
            <div className="panel-title">讨论节点分类导航</div>
            <div className="panel-body">
            {nodes.map((node, i) =>
              <Node key={'node_'+i} node={node} />
            )}
            </div>
          </Col>
        </Row>
        <Row className="dashboard-row">
          <Col span={24}>
            <div className="panel-title">热门城市</div>
            <div className="panel-body city-list">
            {hotCities.map((city, i) => <span key={i}><Link to={"/users/city/"+city}>{city}</Link></span>)}
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  let {pathname, search, hash} = state.routing.locationBeforeTransitions;
  if (hash.indexOf('#') > -1) {
    pathname = hash.slice(1).split('?')[0];
    search = hash.indexOf('?') > -1 ? '?' + hash.split('?')[1] : ''
  }

  const {topicsByTab, nodesFetchState} = state
  const {
    isFetching,
    lastUpdated,
    items:topics,
    error
  } = topicsByTab['/topics/popular'] || {
    isFetching: true,
    items: []
  }

  const {
    items: nodes,
  } = nodesFetchState['nodes'] || {
    items: []
  }
  return {
    pathname,
    search,
    nodes,
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
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
