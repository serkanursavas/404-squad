import { useEffect, useRef } from 'react'
import MatchesList from '../components/match/MatchesList'

import TypingEffect from '../components/ui/TypingEffect'
import useMatches from '../hooks/useMatches'
import PixelSpinner from '../components/ui/PixelSpinner'

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

  if (!totalCount) {
    return (
      <div className="absolute top-0 left-0 z-0 flex items-center justify-center w-screen h-screen ">
        <PixelSpinner />
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
        {hasNextPage ? 'Loading more matches...' : allMatches.length >= 10 && allMatches.length >= totalCount ? 'No more matches' : ''}
      </div>
    </div>
  )
}
