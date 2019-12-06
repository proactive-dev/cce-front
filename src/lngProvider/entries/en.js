import antdData from 'antd/lib/locale/en_US'
import appLocaleData from 'react-intl/locale-data/en'
import enMessages from '../locales/en.json'

const enLang = {
  messages: {
    ...enMessages
  },
  antd: antdData,
  locale: 'en',
  data: appLocaleData
}
export default enLang
