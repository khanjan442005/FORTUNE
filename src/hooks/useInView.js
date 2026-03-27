import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'

const LOCAL_STORAGE_EVENT = 'dynamic-windows:local-storage'

function resolveValue(value) {
  return value instanceof Function ? value() : value
}

export function useInView(options = {}) {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    triggerOnce = false,
    initialInView = false,
  } = options
  const [isInView, setIsInView] = useState(() => {
    if (typeof window !== 'undefined' && typeof window.IntersectionObserver === 'undefined') {
      return true
    }

    return initialInView
  })
  const ref = useRef(null)

  useEffect(() => {
    const currentNode = ref.current

    if (!currentNode) {
      return undefined
    }

    if (triggerOnce && isInView) {
      return undefined
    }

    if (typeof window === 'undefined' || typeof window.IntersectionObserver === 'undefined') {
      return undefined
    }

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        const nextInView = entry.isIntersecting || entry.intersectionRatio > 0
        setIsInView(nextInView)

        if (nextInView && triggerOnce) {
          observer.unobserve(entry.target)
        }
      },
      { threshold, root, rootMargin },
    )

    observer.observe(currentNode)

    return () => {
      observer.disconnect()
    }
  }, [isInView, root, rootMargin, threshold, triggerOnce])

  return [ref, isInView]
}

export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedValue(value)
    }, Math.max(delay, 0))

    return () => window.clearTimeout(handler)
  }, [delay, value])

  return delay <= 0 ? value : debouncedValue
}

export function useLocalStorage(key, initialValue, options = {}) {
  const {
    serializer = JSON.stringify,
    deserializer = JSON.parse,
    syncTabs = true,
  } = options
  const fallbackValue = useMemo(() => resolveValue(initialValue), [initialValue])
  const snapshotCacheRef = useRef({
    hasStoredValue: false,
    raw: null,
    value: fallbackValue,
  })
  const getSnapshot = useCallback(
    () => {
      if (typeof window === 'undefined') {
        return fallbackValue
      }

      try {
        const item = window.localStorage.getItem(key)

        if (item === null) {
          snapshotCacheRef.current = {
            hasStoredValue: false,
            raw: null,
            value: fallbackValue,
          }

          return fallbackValue
        }

        if (
          snapshotCacheRef.current.hasStoredValue &&
          snapshotCacheRef.current.raw === item
        ) {
          return snapshotCacheRef.current.value
        }

        const parsedValue = deserializer(item)

        snapshotCacheRef.current = {
          hasStoredValue: true,
          raw: item,
          value: parsedValue,
        }

        return parsedValue
      } catch {
        snapshotCacheRef.current = {
          hasStoredValue: false,
          raw: null,
          value: fallbackValue,
        }

        return fallbackValue
      }
    },
    [deserializer, fallbackValue, key],
  )

  const getServerSnapshot = useCallback(
    () => fallbackValue,
    [fallbackValue],
  )

  const subscribe = useCallback(
    (callback) => {
      if (typeof window === 'undefined') {
        return () => {}
      }

      const handleChange = (event) => {
        if (event.type === 'storage') {
          if (!syncTabs || event.storageArea !== window.localStorage || event.key !== key) {
            return
          }
        }

        if (event.type === LOCAL_STORAGE_EVENT && event.detail?.key !== key) {
          return
        }

        callback()
      }

      if (syncTabs) {
        window.addEventListener('storage', handleChange)
      }

      window.addEventListener(LOCAL_STORAGE_EVENT, handleChange)

      return () => {
        if (syncTabs) {
          window.removeEventListener('storage', handleChange)
        }

        window.removeEventListener(LOCAL_STORAGE_EVENT, handleChange)
      }
    },
    [key, syncTabs],
  )

  const storedValue = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const setValue = useCallback(
    (value) => {
      try {
        const currentValue = getSnapshot()
        const valueToStore = value instanceof Function ? value(currentValue) : value

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, serializer(valueToStore))
          window.dispatchEvent(new CustomEvent(LOCAL_STORAGE_EVENT, { detail: { key } }))
        }
      } catch (error) {
        console.error(error)
      }
    },
    [getSnapshot, key, serializer],
  )

  const removeValue = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
        window.dispatchEvent(new CustomEvent(LOCAL_STORAGE_EVENT, { detail: { key } }))
      }
    } catch (error) {
      console.error(error)
    }
  }, [key])

  return [storedValue, setValue, removeValue]
}
