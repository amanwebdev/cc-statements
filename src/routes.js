import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import LoginPage from './containers/LoginPage'
import GamesPage from './containers/GamesPage'
import HoldersPage from './containers/HoldersPage'
import HolderPage from './containers/HolderPage'
import TrendsPage from './containers/TrendsPage'
//import {requireAuthentication} from './components/AuthenticatedComponent';

export default <Route path="/" component={App}>
  <Route path="/login"
    component={LoginPage} />
  <Route path="/games"
    component={GamesPage} />
  <IndexRoute path="/holders" component={HoldersPage} />
  <Route path="/holder/:holderId" component={HolderPage} />
  <Route path="/trends" component={TrendsPage} />
</Route>
