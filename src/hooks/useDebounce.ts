import { useRef } from 'react'

type Debounce = (...args: any[]) => void

export const useDebounce = (fn: Debounce, delay: number): Debounce => {
  const timeoutRef: any = useRef(null)

  const debounceFn = (...args: any[]): void => {
    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => {
      fn(...args)
    }, delay)
  }

  return debounceFn
}
