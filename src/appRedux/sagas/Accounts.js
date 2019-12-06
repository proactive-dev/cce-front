import { all, call, fork, put, take } from 'redux-saga/effects'
import { GET_ACCOUNTS } from '../../constants/ActionTypes'
import { getAccounts } from '../../api/axiosAPIs'

export function* watchGetAccounts() {
  while (true) {
    yield take(GET_ACCOUNTS)
    try {
      const response = yield call(getAccounts)
      yield put({
        type: GET_ACCOUNTS,
        payload: response.data
      })
    } catch (error) {
      yield put({
        type: GET_ACCOUNTS,
        payload: null
      })
    }
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchGetAccounts)
  ])
}
