import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import TFAuthentication from './auth/TFAuthentication'
import ForgotPassword from './auth/ForgotPassword'
import ResetPassword from './auth/ResetPassword'
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
import Exchange from './main/Exchange'
import Markets from './main/Markets'
import CustomRedirect from '../components/CustomRedirect'
import TradingRules from './common/TradingRules'
import FeeRules from './common/FeeRules'
import Privacy from './common/Privacy'
import Terms from './common/Terms'
import { MARKETS as MARKET_LIST } from '../constants/Markets'
import {
  API_TOKEN_EDIT,
  API_TOKEN_NEW,
  API_TOKENS,
  BALANCES,
  CHANGE_PWD,
  DEPOSIT,
  E_404,
  EXCHANGE,
  FEE_RULES,
  FORGOT_PWD,
  G_AUTH_DISABLE,
  G_AUTH_ENABLE,
  LOGIN,
  LOGIN_AUTH,
  MARKETS,
  OPEN_ORDERS,
  ORDER_HISTORY,
  PRIVACY,
  REFERRAL,
  REGISTER,
  RESET_PWD,
  TERMS,
  TRADE_HISTORY,
  TRADING_RULES,
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
      <Route exact path={`${match.url}${MARKETS}`} component={Markets}/>
      <Route exact path={`${match.url}${EXCHANGE}/:market`} component={Exchange}/>
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
      <Route exact path={`${match.url}${TRADING_RULES}`} component={TradingRules}/>
      <Route exact path={`${match.url}${FEE_RULES}`} component={FeeRules}/>
      <Route exact path={`${match.url}${PRIVACY}`} component={Privacy}/>
      <Route exact path={`${match.url}${TERMS}`} component={Terms}/>
      <Route exact path={`${match.url}${EXCHANGE}`}
             render={() => <CustomRedirect path={`${match.url}${EXCHANGE}/${MARKET_LIST[0].id}`}/>}/>
      <Redirect from='*' to={`/${E_404}`}/>
    </Switch>
  </div>
)

export default AppRoute
