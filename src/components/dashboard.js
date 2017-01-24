import React, { Component } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {
  constructor(props) {
    super(props);
  
    this.state = {};
  }

  render() {
    
    return (
      <div>这是首页哦</div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  
  return {
    pathname: state.routing.locationBeforeTransitions.pathname,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
