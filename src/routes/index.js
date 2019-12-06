import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import Home from './main/Home'
import Affiliate from './main/Affiliate'

const AppRoute = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route exact path={`${match.url}`} component={Home}/>
      <Route exact path={`${match.url}affiliate`} component={Affiliate}/>
      <Redirect from='*' to='/404'/>
    </Switch>
  </div>
)

export default AppRoute
