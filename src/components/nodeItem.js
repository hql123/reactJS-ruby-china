import React, { Component, PropTypes } from 'react'
import {Link} from 'react-router'
import '../assets/styles/home.css'

import '../assets/styles/topics.css'
class NodeItem extends Component {
  static propTypes = {
    node: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      node: this.props.node,
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.node.id !== this.state.node.id) {
      this.setState({
        node: nextProps.node,
      })
    }
  }
  nodeUrl(node_id){
    if (node_id === 25) {
      return '/jobs';
    }
    if (node_id === 23) {
      return '/homeland';
    }

    return '/topics?node_id='+node_id;
  }

  render() {
    const node = this.state.node;
    return (
      <div className='node-item'>
        <label>{node.section}</label>
        <div className="node-data">
          {node.data.map((item, i) => 
            <span key={i}><Link to={this.nodeUrl(item.id)}>{item.name}</Link></span>
          )}
        </div>
      </div>
      
    );
  }
}


export default NodeItem
