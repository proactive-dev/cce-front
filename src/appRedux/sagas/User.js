import { all, call, fork, put, take } from 'redux-saga/effects'
import { GET_AUTH_STATUS } from '../../constants/ActionTypes'
import { getAuthStatus } from '../../api/axiosAPIs'

export function* watchGetAuthStatus() {
  while (true) {
    yield take(GET_AUTH_STATUS)
    try {
      const response = yield call(getAuthStatus)
      yield put({
        type: GET_AUTH_STATUS,
        payload: response.data
      })
    } catch (error) {
      yield put({
        type: GET_AUTH_STATUS,
        payload: null
      })
    }
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchGetAuthStatus)
  ])
}
