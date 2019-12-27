// HTTP Status Codes
export const HTTP_BAD_REQUEST = 400
export const HTTP_UNAUTHORIZED = 401
export const HTTP_PAYMENT_REQUIRED = 402
export const HTTP_FORBIDDEN = 403
export const HTTP_NOT_FOUND = 404
export const HTTP_METHOD_NOT_ALLOWED = 405
export const HTTP_NOT_ACCEPTABLE = 406
export const HTTP_PROXY_AUTHENTICATION_REQUIRED = 407
export const HTTP_REQUEST_TIMEOUT = 408
export const HTTP_CONFLICT = 409
export const HTTP_GONE = 410
export const HTTP_INTERNAL_SERVER_ERROR = 500

// Response Codes
export const LOGGED_IN = 2000
export const REGISTERED = 2000
export const RESET_PWD_SUCCESS = 2002
export const LOGGED_OUT = 2003
export const G_AUTH_PASSED = 2010
export const TFA_VERIFIED = 2012

export const LOGIN_FAIL = 4000
export const MEMBER_DISABLED = 4003
export const REGISTER_FAIL = 4004
export const RESET_PWD_FAIL = 4005
export const LOGIN_REQUIRED = 4010
export const TFA_REQUIRED = 4012
export const ADMIN_ROLE_REQUIRED = 4014
export const G_AUTH_FAIL = 4020
export const TFA_FAIL = 4021
export const API_TOKEN_FAIL = 4023
export const ID_DOC_SUBMIT_FAIL = 4024

export const MESSAGES = {
  LOGIN_FAIL: 'wrong.id.or.password',
  REGISTER_FAIL: 'wrong.id.or.password',
  MEMBER_DISABLED: 'account.disabled',
  G_AUTH_FAIL: 'google.auth.enabled',
  TFA_FAIL: 'TFA_CODE_INCORRECT',
  RESET_PWD_FAIL: 'INVALID_PARAMS',
  ID_DOC_SUBMIT_FAIL: 'id.document.failed',
  API_TOKEN_FAIL: 'update.token.failed',
  'default': 'INVALID_PARAMS'
}
