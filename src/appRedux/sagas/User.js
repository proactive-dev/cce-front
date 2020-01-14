import { all, call, fork, put, take } from 'redux-saga/effects'
import { GET_AUTH_STATUS, GET_PROFILE } from '../../constants/ActionTypes'
import { getAuthStatus, getMember } from '../../api/axiosAPIs'

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

export function* watchGetProfile() {
  while (true) {
    yield take(GET_PROFILE)
    try {
      const response = yield call(getMember)
      yield put({
        type: GET_PROFILE,
        payload: response.data
      })
    } catch (error) {
      yield put({
        type: GET_PROFILE,
        payload: null
      })
    }
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchGetAuthStatus),
    fork(watchGetProfile)
  ])
}
