import enLang from './entries/en'
import zhLang from './entries/zh-CN'
import koLang from './entries/ko-KR'
import jaLang from './entries/ja-JP'
import { addLocaleData } from 'react-intl'

const AppLocale = {
  en: enLang,
  zh: zhLang,
  ko: koLang,
  ja: jaLang
}

Object.values(AppLocale).map(appLocale =>
  addLocaleData(appLocale.data)
)

export default AppLocale
