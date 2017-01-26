import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../containers/app'
import Dashboard from '../components/dashboard'
import Home from '../components/home'
import Sites from '../components/sites'
import Wiki from '../components/wiki'
import Topic from '../components/topic'

const RouteConfig = (
  <Route path="/" component={App}>
    <IndexRoute component={Dashboard}/>
    <Route path="/topics" component={Home} />
    <Route path="/topics/popular" component={Home} />
    <Route path="/topics/no_reply" component={Home} />
    <Route path="/topics/last" component={Home} />
    <Route path="/wiki" component={Wiki} />
    <Route path="/sites" component={Sites} />
    <Route path="/homeland" component={Home} />
    <Route path="/jobs" component={Home} />
    <Route path="/topics/:id" component={Topic} />
  </Route>
)
export default RouteConfig

