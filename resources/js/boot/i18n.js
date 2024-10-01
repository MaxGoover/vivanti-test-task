import { createI18n } from 'vue-i18n'
import messages from '@/i18n'

const i18n = createI18n({
  globalInjection: true,
  legacy: false,
  locale: 'ru-RU',
  messages,
})

const $t = i18n.global.t

export { i18n, $t }
