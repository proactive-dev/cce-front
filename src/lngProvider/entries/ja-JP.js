import antdData from 'antd/lib/locale/ja_JP'
import appLocaleData from 'react-intl/locale-data/ja'
import jaMessages from '../locales/ja-JP'

const jaLang = {
  messages: {
    ...jaMessages
  },
  antd: antdData,
  locale: 'ja-JP',
  data: appLocaleData
}
export default jaLang
