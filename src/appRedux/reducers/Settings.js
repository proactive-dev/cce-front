import { SWITCH_LANGUAGE, TOGGLE_COLLAPSED_NAV, WINDOW_WIDTH } from '../../constants/ActionTypes'
import {
  NAV_STYLE,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  THEME_COLOR_SELECTION,
  THEME_COLOR_SELECTION_PRESET,
  THEME_TYPE,
  THEME_TYPE_SEMI_DARK
} from '../../constants/ThemeSetting'
import { LANGUAGES } from '../../constants/AppConfigs'
import { LOCATION_CHANGE } from 'connected-react-router'

const initialSettings = {
  navCollapsed: true,
  navStyle: NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  themeType: THEME_TYPE_SEMI_DARK,
  colorSelection: THEME_COLOR_SELECTION_PRESET,
  pathname: '',
  width: window.innerWidth,
  locale: LANGUAGES[0].code,
  isDirectionRTL: false
}

const settings = (state = initialSettings, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return {
        ...state,
        pathname: action.payload.location.pathname,
        navCollapsed: false
      }
    case TOGGLE_COLLAPSED_NAV:
      return {
        ...state,
        navCollapsed: action.navCollapsed
      }
    case WINDOW_WIDTH:
      return {
        ...state,
        width: action.width
      }
    case THEME_TYPE:
      return {
        ...state,
        themeType: action.themeType
      }
    case THEME_COLOR_SELECTION:
      return {
        ...state,
        colorSelection: action.colorSelection
      }
    case NAV_STYLE:
      return {
        ...state,
        navStyle: action.navStyle
      }
    case SWITCH_LANGUAGE:
      return {
        ...state,
        locale: action.payload
      }
    default:
      return state
  }
}

export default settings
