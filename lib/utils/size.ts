import type { Size } from 'bootstrap-vue-next'

import { SIZE } from '@/enums'

/**
 * bootstrap-vue-next's own `Size` type only covers `'sm' | 'lg'` (the classes
 * it actually applies). `'md'` is murmur's own sentinel for "no size class",
 * used throughout its components alongside `sm`/`lg`.
 */
export type SizeWithMd = Size | SIZE.md

/**
 * Resolves a size that may be murmur's `'md'` sentinel to what
 * bootstrap-vue-next components actually accept, mapping `'md'` to
 * `undefined` (no size class) and passing `sm`/`lg`/`undefined` through.
 *
 * @param size - The size to resolve, possibly `'md'`.
 * @returns The size to forward to a bootstrap-vue-next component.
 * @example
 * resolveSize(SIZE.md) // undefined
 * resolveSize('sm') // 'sm'
 */
export function resolveSize(size?: SizeWithMd): Size | undefined {
  return size === SIZE.md ? undefined : size
}
