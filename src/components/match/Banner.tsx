import MatchInfo from './MatchInfo'

interface MatchInfo {
  date: string
  time: string
  location: string
}

type BannerProps = {
  match: MatchInfo
}

export default function Banner({ match }: BannerProps) {
  return (
    <div className="relative p-2 overflow-hidden text-sm shadow-lg bg-primary">
      <span className="absolute top-0 right-0 w-3/5 h-full bg-white rounded-tl-full bg-opacity-5 "></span>
      <div className="relative z-10 space-y-2">
        <h2 className="mb-4 text-lg text-center text-white">NEXT MATCH</h2>

        <MatchInfo
          date={match.date}
          time={match.time}
          location={match.location}
        />

        <div className="text-right">
          <button className="px-3 py-1 text-sm bg-white rounded-sm">Match Details</button>
        </div>
      </div>
    </div>
  )
}
