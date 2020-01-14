import { all } from 'redux-saga/effects'
import accountSagas from './sagas/Accounts'
import userSagas from './sagas/User'
import marketSagas from './sagas/Markets'

export default function* rootSaga() {
  yield all([
    accountSagas(),
    userSagas(),
    marketSagas()
  ])
}
