import { useRef } from "react"

interface T {
  (...args: any[]): void
}

export default function useDebounce(fn: T, delay: number): T {
  const timeoutRef: any = useRef(null)

  function debounceFn(...args: any[]) {
    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => {
      fn(...args)
    }, delay)
  }
  
  return debounceFn
  
}