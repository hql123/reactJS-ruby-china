import React, { Component, PropTypes } from 'react'
import { Layout, Button, Icon } from 'antd';
import { connect } from 'react-redux'
import {Link} from 'react-router';
import  Topics  from './topics';
import  Siderbar  from './siderbar';

const { Header, Content, Sider } = Layout;
import '../assets/styles/home.css'


class Home extends Component {
  static propTypes = {
    pathname: PropTypes.string.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      current: this.props.pathname,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.pathname !== this.state.current) {
      this.setState({
        current: nextProps.pathname,
      })
    }
  }
  
  render() {
    return (
      <Layout>
      <Header id="node-header">
      <ul className="node-filter">
        <li><Button type="default" className="node-button">所有节点<Icon type="right" /></Button></li>
        <li className={ this.state.current === '/topics' ? 'active' : '' } ><Link to='/topics'>默认</Link></li>
        <li className={ this.state.current === '/topics/popular' ? 'active' : '' } ><Link to='/topics/popular' ><Icon type="smile-o" />优质帖子</Link></li>
        <li className={ this.state.current === '/topics/no_reply' ? 'active' : '' }><Link to='/topics/no_reply' >无人问津</Link></li>
        <li className={ this.state.current === '/topics/last' ? 'active' : '' } ><Link to='/topics/last' >最新发布</Link></li>
      </ul>
      </Header>
      <Layout className="main">
        <Content className="main-content"><Topics /></Content>
        <Sider className="main-sider"><Siderbar /></Sider>
      </Layout>
      </Layout>
      
    )
  }
}
const mapStateToProps = (state, props) => {

  return {
    pathname: state.routing.locationBeforeTransitions.pathname,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
