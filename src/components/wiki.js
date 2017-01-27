import React, { Component } from 'react'
import {Alert} from 'react-bootstrap'

class Wiki extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '/wiki',
    }
  }
  render() {
    return (
      <div>
        <Alert bsStyle="info" ><strong>功能正在开发！</strong>啦啦啦</Alert>
      </div>
    );
  }

}
export default Wiki
