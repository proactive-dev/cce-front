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
import Login from './common/Login'
import Register from './common/Register'
import TFAuthentication from './common/TFAuthentication'
import ForgotPassword from './common/ForgotPassword'
import ResetPassword from './common/ResetPassword'
import {
  API_TOKEN_EDIT,
  API_TOKEN_NEW,
  API_TOKENS,
  BALANCES,
  CHANGE_PWD,
  DEPOSIT,
  E_404,
  FORGOT_PWD,
  G_AUTH_DISABLE,
  G_AUTH_ENABLE,
  LOGIN,
  LOGIN_AUTH,
  OPEN_ORDERS,
  ORDER_HISTORY,
  REFERRAL,
  REGISTER,
  RESET_PWD,
  TRADE_HISTORY,
  TRANSACTIONS,
  USER,
  VERIFICATION,
  WITHDRAWAL
} from '../constants/Paths'

const AppRoute = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route exact path={`${match.url}`} component={Home}/>
      <Route exact path={`${match.url}${LOGIN}`} component={Login}/>
      <Route exact path={`${match.url}${REGISTER}`} component={Register}/>
      <Route exact path={`${match.url}${LOGIN_AUTH}`} component={TFAuthentication}/>
      <Route exact path={`${match.url}${FORGOT_PWD}`} component={ForgotPassword}/>
      <Route exact path={`${match.url}${RESET_PWD}/:token`} component={ResetPassword}/>
      <Route exact path={`${match.url}${BALANCES}`} component={Balances}/>
      <Route exact path={`${match.url}${DEPOSIT}`} component={Deposit}/>
      <Route exact path={`${match.url}${WITHDRAWAL}`} component={Withdrawal}/>
      <Route exact path={`${match.url}${TRANSACTIONS}`} component={Transactions}/>
      <Route exact path={`${match.url}${USER}`} component={UserCenter}/>
      <Route exact path={`${match.url}${CHANGE_PWD}`} component={ChangePassword}/>
      <Route exact path={`${match.url}${VERIFICATION}`} component={IdVerification}/>
      <Route exact path={`${match.url}${OPEN_ORDERS}`} component={OpenOrders}/>
      <Route exact path={`${match.url}${ORDER_HISTORY}`} component={OrderHistory}/>
      <Route exact path={`${match.url}${TRADE_HISTORY}`} component={TradeHistory}/>
      <Route exact path={`${match.url}${API_TOKENS}`} component={ApiTokens}/>
      <Route exact path={`${match.url}${API_TOKEN_NEW}`} component={NewApiToken}/>
      <Route exact path={`${match.url}${API_TOKEN_EDIT}`} component={EditApiToken}/>
      <Route exact path={`${match.url}${G_AUTH_ENABLE}`} component={EnableGoogleAuth}/>
      <Route exact path={`${match.url}${G_AUTH_DISABLE}`} component={DisableGoogleAuth}/>
      <Route exact path={`${match.url}${REFERRAL}`} component={Affiliate}/>
      <Redirect from='*' to={`/${E_404}`}/>
    </Switch>
  </div>
)

export default AppRoute
