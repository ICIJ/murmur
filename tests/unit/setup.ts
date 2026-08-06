import { config } from '@vue/test-utils'
import { i18n } from '@/i18n'
import { createBootstrap } from 'bootstrap-vue-next'

config.global.plugins = [i18n, createBootstrap()]

Object.defineProperty(document, 'fonts', {
  value: { ready: Promise.resolve({}) }
})

class ResizeObserverMock {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}
global.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver

class IntersectionObserverMock {
  constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {}
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  takeRecords = vi.fn(() => [])
  root = null
  rootMargin = ''
  thresholds = [0]
}
// Try multiple approaches to ensure IntersectionObserver is mocked
global.IntersectionObserver = IntersectionObserverMock as unknown as typeof IntersectionObserver
globalThis.IntersectionObserver = IntersectionObserverMock as unknown as typeof IntersectionObserver
if (typeof window !== 'undefined') {
  window.IntersectionObserver = IntersectionObserverMock as unknown as typeof IntersectionObserver
}

global.HTMLCanvasElement.prototype.getContext = () => null
global.HTMLCanvasElement.prototype.toDataURL = () => ''
global.URL.createObjectURL = () => ''
