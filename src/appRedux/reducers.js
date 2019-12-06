import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import Settings from './reducers/Settings'
import Progress from './reducers/Progress'
import Accounts from './reducers/Accounts'
import User from './reducers/User'

export default (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  progress: Progress,
  accounts: Accounts,
  user: User
});
