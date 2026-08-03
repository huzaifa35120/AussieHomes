'use client'

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'

type Direction = 'up' | 'left' | 'right' | 'scale' | 'none'

interface RevealProps {
  children: ReactNode
  /** Direction the element travels from. Default 'up'. */
  dir?: Direction
  /** Stagger delay in milliseconds. */
  delay?: number
  /** Element to render. Default 'div'. */
  as?: ElementType
  className?: string
  /** Replay the animation every time it scrolls back into view. */
  repeat?: boolean
}

/**
 * Scroll-triggered reveal wrapper.
 *
 * Uses IntersectionObserver (no animation library) and degrades gracefully:
 * if the observer is unavailable or the user prefers reduced motion, content
 * is shown immediately.
 */
export default function Reveal({
  children,
  dir = 'up',
  delay = 0,
  as: Tag = 'div',
  className = '',
  repeat = false,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            if (!repeat) observer.unobserve(entry.target)
          } else if (repeat) {
            setVisible(false)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [repeat])

  return (
    <Tag
      ref={ref}
      data-dir={dir}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </Tag>
  )
}
