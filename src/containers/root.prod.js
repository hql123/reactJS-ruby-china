import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import routes from '../config/route'
import { Router, hashHistory } from 'react-router'

const Root = ({ store, history }) => (
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)} />

  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}
export default Root
