import antdData from 'antd/lib/locale/ko_KR'
import appLocaleData from 'react-intl/locale-data/ko'
import koMessages from '../locales/ko-KR'

const koLang = {
  messages: {
    ...koMessages
  },
  antd: antdData,
  locale: 'ko-KR',
  data: appLocaleData
}
export default koLang
