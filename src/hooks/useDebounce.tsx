import { useRef } from 'react'

type CallBackType = (...args: any[]) => void
type ResultType = CallBackType

export const useDebounce = (fn: CallBackType, delay: number): ResultType => {
  const timeoutRef: any = useRef(null)

  const debounceFn = (...args: any[]): void => {
    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => {
      fn(...args)
    }, delay)
  }

  return debounceFn
}
