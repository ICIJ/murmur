import type { Config } from '@/config'

declare module 'vue' {
  interface ComponentCustomProperties {
    $config: Config
  }
}

export {}
