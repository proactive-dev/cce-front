import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Home from './main/Home'
import Deposit from './main/Deposit'
import Withdrawal from './main/Withdrawal'
import Transactions from './main/Transactions'
import UserCenter from './main/UserCenter'
import ChangePassword from './main/ChangePassword'
import IdVerification from './main/IdVerification'
import OpenOrders from './main/OpenOrders'
import OrderHistory from './main/OrderHistory'
import TradeHistory from './main/TradeHistory'
import ApiTokens from './main/ApiTokens'
import NewApiToken from './main/NewApiToken'
import EditApiToken from './main/EditApiToken'
import EnableGoogleAuth from './main/EnableGoogleAuth'
import DisableGoogleAuth from './main/DisableGoogleAuth'
import Affiliate from './main/Affiliate'
import Balances from './main/Balances'

const AppRoute = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route exact path={`${match.url}`} component={Home}/>
      <Route exact path={`${match.url}wallet/balances`} component={Balances}/>
      <Route exact path={`${match.url}wallet/deposit`} component={Deposit}/>
      <Route exact path={`${match.url}wallet/withdrawal`} component={Withdrawal}/>
      <Route exact path={`${match.url}wallet/transactions`} component={Transactions}/>
      <Route exact path={`${match.url}user`} component={UserCenter}/>
      <Route exact path={`${match.url}user/change-password`} component={ChangePassword}/>
      <Route exact path={`${match.url}user/verification`} component={IdVerification}/>
      <Route exact path={`${match.url}history/open-order`} component={OpenOrders}/>
      <Route exact path={`${match.url}history/order`} component={OrderHistory}/>
      <Route exact path={`${match.url}history/trade`} component={TradeHistory}/>
      <Route exact path={`${match.url}api-tokens`} component={ApiTokens}/>
      <Route exact path={`${match.url}api-tokens/new`} component={NewApiToken}/>
      <Route exact path={`${match.url}api-tokens/edit`} component={EditApiToken}/>
      <Route exact path={`${match.url}google-auth/enable`} component={EnableGoogleAuth}/>
      <Route exact path={`${match.url}google-auth/disable`} component={DisableGoogleAuth}/>
      <Route exact path={`${match.url}referral`} component={Affiliate}/>
      <Redirect from='*' to='/404'/>
    </Switch>
  </div>
)

export default AppRoute
