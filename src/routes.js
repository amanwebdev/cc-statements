import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import HoldersPage from './containers/HoldersPage'
import HolderPage from './containers/HolderPage'
import TrendsPage from './containers/TrendsPage'

export default <Route path="/" component={App}>
  <IndexRoute path="/holders" component={HoldersPage} />
  <Route path="/holder/:holderId" component={HolderPage} />
  <Route path="/trends" component={TrendsPage} />
</Route>
