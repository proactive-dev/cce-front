import { HOST_URL } from '../constants/AppConfigs'

/**
 * Axios related configurations here
 */

export const HOST_API_URL = `${HOST_URL}/api/v2`
export const REGISTER_URL = `${HOST_URL}/auth/identity/register`
export const LOGIN_URL = `${HOST_URL}/auth/identity/callback`
export const LOGOUT_URL = `${HOST_URL}/signout`
export const TFA_VERIFY_URL = `${HOST_URL}/auth/app`
export const RESET_PWD_URL = `${HOST_URL}/reset_passwords`
export const AUTH_STATUS_URL = `${HOST_URL}/auth/status`
export const MEMBER_URL = `${HOST_URL}/member`
export const CHANGE_PWD_URL = `${HOST_URL}/identity`
export const ACTIVATION_URL = `${HOST_URL}/activations/new`
export const GOOGLE_AUTH_URL = `${HOST_URL}/verify/google_auth`
export const API_TOKENS_URL = `${HOST_URL}/api_tokens`
export const ID_DOCUMENT_URL = `${HOST_URL}/id_document`
export const TFA_URL = `${HOST_URL}/two_factors/app`
export const MARKETS_URL = `${HOST_URL}/markets`
export const TICKERS_URL = `${HOST_API_URL}/tickers`
export const OHLC_URL = `${HOST_API_URL}/k`
export const REF_DATA_URL = `${HOST_URL}/referrals?simple=true`
export const ALL_ACCOUNTS_URL = `${HOST_URL}/accounts`
export const ACCOUNTS_URL = `${HOST_URL}/accounts/main`
export const MAIN_ACCOUNTS_URL = `${HOST_URL}/accounts/main`
export const CURRENCIES_URL = `${HOST_URL}/configs/currencies`
export const LEVELS_URL = `${HOST_URL}/configs/levels`
export const MARKET_CONFIGS_URL = `${HOST_URL}/configs/markets`
export const HISTORY_ORDER_URL = `${HOST_URL}/history/orders`
export const HISTORY_TRADE_URL = `${HOST_URL}/history/trades`
export const ADDR_MNG_URL = `${HOST_URL}/fund_sources`
export const WITHDRAWS_URL = `${HOST_URL}/funds/withdraws`
export const DEPOSITS_URL = `${HOST_URL}/funds/deposits`
export const WITHDRAW_URL = `${HOST_URL}/withdraws`
export const MOVE_FUNDS_URL = `${HOST_URL}/move_funds`
export const TICKETS_URL = `${HOST_URL}/tickets`
