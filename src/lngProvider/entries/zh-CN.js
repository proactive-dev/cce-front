import antdData from 'antd/lib/locale/zh_CN'
import appLocaleData from 'react-intl/locale-data/zh'
import zhMessages from '../locales/zh-CN.json'

const zhLang = {
  messages: {
    ...zhMessages
  },
  antd: antdData,
  locale: 'zh-CN',
  data: appLocaleData
}
export default zhLang
