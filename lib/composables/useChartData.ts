import { json, csv, tsv } from 'd3-fetch'
import isString from 'lodash/isString'
import { shallowRef, toRef, toValue, watch } from 'vue'
import type { Ref } from 'vue'

/**
 * Data a chart can be fed: an array of rows, a keyed record of numbers, a URL
 * string to fetch from, or `null` before anything is provided.
 */
export type ChartData = Record<string, unknown>[] | Record<string, number> | string | null

/**
 * Data a chart holds once loading has settled: the inline value passed through,
 * or the parsed result of a fetched URL, narrowed to the caller's own datum
 * shape `T` (e.g. `BarChartDatum[]`), or `null` before the first load.
 */
export type LoadedData<T = Record<string, unknown>[] | Record<string, number>> = T | null

/**
 * Reactive inputs driving {@link useChartData}: the raw chart data and the file
 * format to parse when that data is a URL.
 */
export interface UseChartDataOptions {
  data: Ref<ChartData>
  dataUrlType: Ref<'json' | 'csv' | 'tsv'>
}

/**
 * Reactive API returned by {@link useChartData}.
 */
export interface UseChartData<T = Record<string, unknown>[] | Record<string, number>> {
  /**
   * The chart's resolved data: inline data passed through, or the parsed result
   * of a fetched URL. `null` until the first load settles.
   */
  loadedData: Ref<LoadedData<T>>
}

/**
 * Owns a chart's data-loading concern: it watches the data and format inputs
 * and, whenever they change, either fetches and parses a URL through d3 or
 * passes inline data through untouched. A caller-supplied `onLoaded` hook is
 * awaited after each settled load so the parent can run its own side effects
 * (emitting events, sizing) in a predictable order.
 *
 * @param options - The reactive data and URL-type inputs (see {@link UseChartDataOptions}).
 * @param onLoaded - Hook awaited after every settled load, receiving the freshly loaded data.
 * @returns The {@link UseChartData} API exposing `loadedData`.
 * @remarks Internal building block consumed by {@link useChart}; not exported from the package root.
 * @example
 * // Inside useChart, wiring the load hook to lifecycle events:
 * import { useChartData } from '@/composables/useChartData'
 *
 * const { loadedData } = useChartData(
 *   { data: props.data, dataUrlType: props.dataUrlType },
 *   async (data) => {
 *     // simplified — see useChart for the full load→emit ordering
 *     // (afterLoaded → isLoaded → emit('loaded') → onResized → emit('resized'))
 *     await afterLoaded?.()
 *     emit('loaded', data)
 *   }
 * )
 */
export function useChartData<T = Record<string, unknown>[] | Record<string, number>>(
  options: UseChartDataOptions,
  onLoaded: (data: LoadedData<T>) => void | Promise<void>
): UseChartData<T> {
  const dataRef = toRef(options.data)
  const dataUrlTypeRef = toRef(options.dataUrlType)
  // shallowRef: loadedData is always replaced wholesale on load, never mutated
  // in place, and it sidesteps a Vue/TS UnwrapRef quirk on the generic T.
  const loadedData = shallowRef<LoadedData<T>>(null)

  // Reload whenever the data or its format changes: a URL string is fetched and
  // parsed through the matching d3 loader, while inline data is passed through.
  watch([dataRef, dataUrlTypeRef], async () => {
    await document.fonts?.ready

    const data = toValue(dataRef)
    const dataUrlType = toValue(dataUrlTypeRef)

    if (isString(data)) {
      const loaders: Record<string, (url: string) => Promise<unknown>> = { json, csv, tsv }
      const loader = loaders[dataUrlType as string]
      if (!loader) {
        throw new Error(`unsupported dataUrlType "${dataUrlType}": expected json, csv or tsv`)
      }
      // Trust boundary: the fetched/parsed payload's actual shape is asserted by
      // the caller's T type argument to useChart<T>, not verified at runtime.
      loadedData.value = (await loader(data)) as unknown as LoadedData<T>
    }
    else {
      // Same trust boundary: props.data is declared as the wide ChartData union
      // by each component's own props, but T asserts the concrete shape that
      // component actually feeds in.
      loadedData.value = data as unknown as LoadedData<T>
    }

    await onLoaded(loadedData.value)
  }, { immediate: true })

  return { loadedData }
}

export default useChartData
