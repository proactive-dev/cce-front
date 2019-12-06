import axios from 'axios'
import * as axiosConfig from './axiosConfig'

const getHeaders = {
  // 'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json; charset=utf-8'
}

const formDataHeaders = {
  // 'Access-Control-Allow-Origin': '*',
  'Content-Type': 'multipart/form-data'
}

const jsonHeaders = {
  // 'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
}

export const axiosRequest = (method, url, reqData = null, needLoader = true) => {
  let reqConfig = {
    url: url,
    method: method,
    baseURL: axiosConfig.HOST_URL,
    withCredentials: true,
    needLoader: needLoader, // custom config for show loader
    headers: getHeaders // default: get
  }
  if (method === 'post' || method === 'put' || method === 'patch') {
    const headers = reqData instanceof FormData ? formDataHeaders : jsonHeaders
    reqConfig['data'] = reqData
    reqConfig['headers'] = headers
  } else { // 'get', 'delete', 'head'
    reqConfig['params'] = reqData
  }
  return axios.request(reqConfig)
}

export const register = (data) => {
  return axiosRequest('post', axiosConfig.REGISTER_URL, data)
}

export const login = (data) => {
  return axiosRequest('post', axiosConfig.LOGIN_URL, data)
}

export const logout = () => {
  return axiosRequest('get', axiosConfig.LOGOUT_URL)
}

export const verifyTFA = (data) => {
  return axiosRequest('post', axiosConfig.TFA_VERIFY_URL, data)
}

export const forgotPassword = (data) => {
  return axiosRequest('post', axiosConfig.FORGOT_PWD_URL, data)
}

export const getAuthStatus = (needLoader = false) => {
  return axiosRequest('get', axiosConfig.AUTH_STATUS_URL, null, needLoader)
}

export const getAccounts = (needLoader = false) => {
  return axiosRequest('get', axiosConfig.ACCOUNTS_URL, null, needLoader)
}

export const getRefData = (data = null, needLoader = false) => {
  return axiosRequest('get', axiosConfig.REF_DATA_URL, data, needLoader)
}
