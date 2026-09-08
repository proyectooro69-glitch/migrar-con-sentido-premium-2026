import { useEffect, useState } from 'react'
import { getSiteContent, type SiteContentMap } from '@/server/content'

// Fetches editable site content once on mount. Starts with `defaults` (so the
// prerendered/first-paint HTML always shows real text, never a blank flash),
// then silently swaps in whatever's saved in the database, if anything is.
// If the fetch fails for any reason (DB not configured yet, network hiccup),
// it just keeps showing the defaults — the public site never breaks because
// of this.
export function useSiteContent<T extends Record<string, any>>(key: string, defaults: T): T {
  const [content, setContent] = useState<T>(defaults)

  useEffect(() => {
    let cancelled = false
    getSiteContent()
      .then((all: SiteContentMap) => {
        if (cancelled) return
        const saved = all?.[key]
        if (saved && typeof saved === 'object') {
          setContent((prev) => ({ ...prev, ...saved }))
        }
      })
      .catch(() => {
        // Stay on defaults — see note above.
      })
    return () => {
      cancelled = true
    }
  }, [key])

  return content
}
