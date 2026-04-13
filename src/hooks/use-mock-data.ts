"use client"
import { useState, useEffect } from "react"

export function useMockData<T>(loader: () => T, delay = 600) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(loader())
      setLoading(false)
    }, delay)
    return () => clearTimeout(timer)
  }, [delay, loader])

  return { data, loading }
}
