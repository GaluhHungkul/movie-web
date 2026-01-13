"use client"
import { useEffect, useState } from "react"

export function useIsLargeScreen(minWidth = 1024) {
  const [isLarge, setIsLarge] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${minWidth}px)`)

    setIsLarge(media.matches)

    const handler = (e: MediaQueryListEvent) =>
      setIsLarge(e.matches)

    media.addEventListener("change", handler)
    return () => media.removeEventListener("change", handler)
  }, [minWidth])

  return isLarge
}
