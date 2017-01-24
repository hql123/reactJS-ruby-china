import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import routes from '../config/route'
import DevTools from './devTools'
import { Router } from 'react-router'

const Root = ({ store, history }) => (
  <Provider store={store}>
    <div>
      <Router history={history} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
      <DevTools />
    </div>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default Root
