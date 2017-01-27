import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router';
import  Topics  from './topics';
import  Siderbar  from './siderbar';
import  ReactMarkdown from 'react-markdown';
import '../assets/styles/home.css'
import Node from './nodeItem';
import {Grid, Row, Col, Modal, Button, Panel} from 'react-bootstrap';
import Font from 'react-fontawesome';

class Home extends Component {
  static propTypes = {
    pathname: PropTypes.string.isRequired,
    nodes: PropTypes.array.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      current: this.props.pathname,
      nodes: this.props.nodes,
      node: {},
      visible: false,
      node_id: Number(this.props.node_id),
    };
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.setState({
      visible: !this.state.visible,
    });
  }
  componentDidMount() {
    const {pathname, node_id, nodes} = this.props;
    let node;
    if (Number(node_id) > 0) {
      node = nodes.find(item => item.id === Number(node_id))
    }
    if (pathname === '/jobs') {
      node = nodes.find(item => item.id === 25)
    }
    if (pathname === '/homeland') {
      node = nodes.find(item => item.id === 23)
    }
    this.setState({
      current: pathname,
      nodes: nodes,
      node: node,
      node_id: Number(node_id),
      visible: false,
    });
    
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.nodes.length > 0 && nextProps.nodes.length !== this.state.nodes.length) || nextProps.pathname !== this.state.current || Number(nextProps.node_id) !== this.state.node_id) {
      const {pathname, node_id, nodes} = nextProps;
      let node;
      if (Number(node_id) > 0) {
        node = nodes.find(item => item.id === Number(node_id))
      }
      if (pathname === '/jobs') {
        node = nodes.find(item => item.id === 25)
      }
      if (pathname === '/homeland') {
        node = nodes.find(item => item.id === 23)
      }
      this.setState({
        nodes: nextProps.nodes,
        node: node,
        node_id: Number(Number(node_id)),
      });
      if (nextProps.pathname !== this.state.current || Number(node_id) !== this.state.node_id) {
        this.setState({
          current: nextProps.pathname,
          visible: false,
        })
      }
    }
    
  }
  
  render() {
    let header = (
      this.state.current.indexOf('topics') > -1 && this.state.node_id === 0
      ? <div id="node-header">
        <Grid>
        <ul className="nav nav-pills node-filter">
          <li><Button bsStyle="default" className="node-button" onClick={this.handleClick}>所有节点<Font name="caret-right" /></Button></li>
          <li className={ this.state.current === '/topics' ? 'active' : '' } ><Link to='/topics'>默认</Link></li>
          <li className={ this.state.current === '/topics/popular' ? 'active' : '' } ><Link to='/topics/popular' ><div type="smile-o" />优质帖子</Link></li>
          <li className={ this.state.current === '/topics/no_reply' ? 'active' : '' }><Link to='/topics/no_reply' >无人问津</Link></li>
          <li className={ this.state.current === '/topics/last' ? 'active' : '' } ><Link to='/topics/last' >最新发布</Link></li>
        </ul>
        </Grid>
        </div>
      : (this.state.current === '/jobs' || this.state.current === '/homeland' || this.state.node_id > 0
        ? <Panel className="node-panel">
          <Grid>
            <div className="node-title">{this.state.node ? this.state.node.name : ''}<span style={{fontSize: '14px', color: '#999', marginLeft: '10px'}}>共有{this.state.node ? this.state.node.topics_count : 0}个讨论主题</span></div>
            <div className="node-summry">
            <ReactMarkdown source={this.state.node && this.state.node.summary ? this.state.node.summary : ''} />
            </div>
          </Grid>
          </Panel>
          
        : ''
        )
     
    );
    let nodes = this.state.nodes.group(item => item.section_name);
    return (
      <div>
      {header}
      <Grid>
      <Modal show={this.state.visible} bsSize="large" onHide={this.handleClick}>
        <Modal.Header closeButton><Modal.Title id="contained-modal-title-lg">选择话题节点</Modal.Title></Modal.Header>
        <Modal.Body>
        {nodes.map((node, i) =>
          <Node key={i} node={node} />
        )}
        </Modal.Body>
        
      </Modal>
      <Row>
        <Col md={9}>
        <Panel>
          <Topics />
        </Panel>
        </Col>
        <Col md={3}>
        
          <Siderbar />
        </Col>
      </Row>
      </Grid>
      </div>
      
    )
  }
}

const mapStateToProps = (state, props) => {
  let {pathname, query, hash} = state.routing.locationBeforeTransitions;
  let node_id = query.node_id || 0
  if (hash.indexOf('#') > -1) {
    pathname = hash.slice(1).split('?')[0];
    node_id = hash.indexOf('node_id=') > -1 ? hash.split('node_id=')[1].split('&')[0] : node_id
  }
  const {nodesFetchState} = state
  
  const {
    items:nodes,
  } = nodesFetchState['nodes'] || {
    items: []
  }
  return {
    pathname,
    nodes,
    node_id,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
