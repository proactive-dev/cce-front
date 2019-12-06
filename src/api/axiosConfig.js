import { PRODUCTION_URL } from '../constants/AppConfigs'

/**
 * Axios related configurations here
 */

export const HOST_URL = process.env.NODE_ENV === 'production' ? `${PRODUCTION_URL}:8443` : 'http://localhost:4000'

export const REGISTER_URL = `${HOST_URL}/auth/identity/register`
export const LOGIN_URL = `${HOST_URL}/auth/identity/callback`
export const LOGOUT_URL = `${HOST_URL}/signout`
export const TFA_VERIFY_URL = `${HOST_URL}/auth/app`
export const FORGOT_PWD_URL = `${HOST_URL}/reset_passwords`
export const AUTH_STATUS_URL = `${HOST_URL}/auth/status`
export const ACCOUNTS_URL = `${HOST_URL}/accounts/main?simple=true`
export const REF_DATA_URL = `${HOST_URL}/referrals?simple=true`

// export const MARKETS_URL = `${HOST_URL}/markets`
// export const PURCHASE_CONFIG_URL = `${HOST_URL}/configs/purchase`
// export const TWO_FACTOR_URL = `${HOST_URL}/two_factors/app`
