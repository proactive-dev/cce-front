import { all, call, fork, put } from 'redux-saga/effects'
import { GET_TICKERS } from '../actions'
import { getTickers } from '../../api/axiosAPIs'
import { TICKER_INTERVAL } from '../../constants/AppConfigs'

function delay(duration) {
  const promise = new Promise(resolve => {
    setTimeout(() => resolve(true), duration)
  })
  return promise
}

function* watchGetTickers() {
  while (true) {
    try {
      const {data} = yield call(getTickers)
      yield put({type: GET_TICKERS, data: data})
      yield call(delay, TICKER_INTERVAL)
    } catch (e) {
      yield call(delay, TICKER_INTERVAL)
    }
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchGetTickers)
  ])
}