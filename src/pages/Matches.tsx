import { useEffect, useRef } from 'react'
import MatchesList from '../components/match/MatchesList'

import TypingEffect from '../components/ui/TypingEffect'
import useMatches from '../hooks/useMatches'

export default function Matches() {
  const { allMatches, fetchNextPage, hasNextPage, totalCount } = useMatches(true)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hasNextPage) return // Daha fazla sayfa yoksa observer eklemeye gerek yok

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetchNextPage() // Sayfa sonuna yaklaşıldığında bir sonraki sayfayı yükle
      }
    })

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current)
      }
    }
  }, [hasNextPage, fetchNextPage])

  if (totalCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 border border-black bg-neutral-light shadow-pixel">
        <p className="text-lg font-bold">Coming Soon</p>
        <p className="text-sm text-center text-neutral-dark">There are no matches played yet. Stay tuned!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <TypingEffect
        text={['Latest Matches']}
        className="text-sm text-purple-400 "
      />
      <MatchesList matchesData={allMatches} />

      <div
        ref={loadMoreRef}
        className="loading-indicator"
      >
        {hasNextPage ? 'Loading more matches...' : allMatches.length > 0 && allMatches.length < totalCount ? '' : 'No more matches'}
      </div>
    </div>
  )
}
