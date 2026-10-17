import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop ensures that whenever the route pathname or hash changes,
 * the page viewport is immediately scrolled to the top (or to the hash target),
 * solving the SPA issue where navigation keeps previous scroll offset.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      })
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    } else {
      const id = hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [pathname, hash])

  return null
}
