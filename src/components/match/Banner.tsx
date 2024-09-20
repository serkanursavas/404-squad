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
    <div className="relative px-4 py-8 overflow-hidden text-sm shadow-lg bg-primary">
      <span className="absolute top-0 left-0 w-3/5 h-full bg-white rounded-tr-full bg-opacity-30 "></span>
      <div className="relative z-10 space-y-6">
        <h2 className="mb-4 text-3xl text-center text-white">NEXT MATCH</h2>

        <MatchInfo
          date={match.date}
          time={match.time}
          location={match.location}
        />

        <div className="text-right">
          <button className="px-3 py-1 text-sm bg-white rounded-sm ">Match Details</button>
        </div>
      </div>
    </div>
  )
}
