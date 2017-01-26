
import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/root'
import configureStore from './store/configureStore'
import {addPrototype} from './config/array';

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)
addPrototype()
render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)
