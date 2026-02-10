import { useCallback, useEffect, useRef, useState } from "react"

type UseStudyTimerOptions = {
  inactivityMs?: number 
}

export function useStudyTimer(
  options: UseStudyTimerOptions = {}
) {
  const inactivityMs = options.inactivityMs ?? 60_000

  const activeStartRef = useRef<number | null>(null)
  const totalMsRef = useRef(0)
  const lastInteractionRef = useRef(Date.now())

  const [activeTimeMs, setActiveTimeMs] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const syncState = () => {
    let total = totalMsRef.current

    if (activeStartRef.current !== null) {
      total += Date.now() - activeStartRef.current
    }

    setActiveTimeMs(total)
  }

  const start = useCallback(() => {
    if (activeStartRef.current === null) {
      activeStartRef.current = Date.now()
      setIsRunning(true)
    }
  }, [])

  const pause = useCallback(() => {
    if (activeStartRef.current !== null) {
      totalMsRef.current += Date.now() - activeStartRef.current
      activeStartRef.current = null
      setIsRunning(false)
      syncState()
    }
  }, [])

  const reset = useCallback(() => {
    activeStartRef.current = null
    totalMsRef.current = 0
    setActiveTimeMs(0)
    setIsRunning(false)
  }, [])

  // 🕶 Visibility + focus handling
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        pause()
      } else {
        start()
      }
    }

    const handleBlur = () => pause()
    const handleFocus = () => start()

    document.addEventListener("visibilitychange", handleVisibility)
    window.addEventListener("blur", handleBlur)
    window.addEventListener("focus", handleFocus)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility)
      window.removeEventListener("blur", handleBlur)
      window.removeEventListener("focus", handleFocus)
    }
  }, [start, pause])

  // 💤 Inactivity tracking
  useEffect(() => {
    const updateInteraction = () => {
      lastInteractionRef.current = Date.now()
    }

    const events = ["pointerdown", "keydown", "touchstart"]

    events.forEach(e =>
      document.addEventListener(e, updateInteraction)
    )

    const interval = setInterval(() => {
      if (
        isRunning &&
        Date.now() - lastInteractionRef.current > inactivityMs
      ) {
        pause()
      }
    }, 5_000)

    return () => {
      events.forEach(e =>
        document.removeEventListener(e, updateInteraction)
      )
      clearInterval(interval)
    }
  }, [pause, isRunning, inactivityMs])

  // ⏱ UI sync tick
  useEffect(() => {
    const interval = setInterval(syncState, 1_000)
    return () => clearInterval(interval)
  }, [])

  return {
    activeTimeMs,
    isRunning,
    start,
    pause,
    reset,
  }
}