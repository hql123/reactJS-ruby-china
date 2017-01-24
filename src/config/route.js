import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../containers/app'
import Dashboard from '../components/dashboard'
import Home from '../components/home'


const RouteConfig = (
  <Route path="/" component={App}>
    <IndexRoute component={Dashboard}/>
    <Route path="/topics" component={Home} />
    <Route path="/topics/popular" component={Home} />
    <Route path="/topics/no_reply" component={Home} />
    <Route path="/topics/last" component={Home} />
    <Route path="/wiki" component={Home} />
    <Route path="/sites" component={Home} />
    <Route path="/homeland" component={Home} />
    <Route path="/jobs" component={Home} />
  </Route>
)
export default RouteConfig

