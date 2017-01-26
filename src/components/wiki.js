import React, { Component } from 'react'
import { Alert } from 'antd';

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
        <Alert message="功能尚未开发！" description="客官请稍等几年~" type="info" />
      </div>
    );
  }

}
export default Wiki
