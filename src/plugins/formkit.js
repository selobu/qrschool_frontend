import { defaultConfig } from '@formkit/vue'

import { es } from '@formkit/i18n'

const cfg = {
  locales: { es },
  locale: 'es',
  theme: 'genesis'
}

export const config = defaultConfig(cfg)
