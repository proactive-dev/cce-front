import { all } from 'redux-saga/effects'
import accountSagas from './sagas/Accounts'
import userSagas from './sagas/User'

export default function* rootSaga() {
  yield all([
    accountSagas(),
    userSagas()
  ])
}
