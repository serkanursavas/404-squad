import GoalList from '../GoalList'
import homeTeamLogo from '../../../assets/images/club-black.svg'
import awayTeamLogo from '../../../assets/images/club-white.svg'
import { Goal } from '../../../types/MatchTypes'

export default function Scoreboard({
  homeTeamScore,
  awayTeamScore,
  goals,
  isPlayed
}: {
  homeTeamScore: number
  awayTeamScore: number
  goals: Goal[]
  isPlayed: boolean
}) {
  const homeTeamGoals = goals.filter(goal => goal.teamColor === 'black')
  const awayTeamGoals = goals.filter(goal => goal.teamColor === 'white')

  return (
    <div className="border-2 border-black shadow-pixel">
      <div className="flex items-center justify-between px-2 py-2 text-3xl ">
        <img
          src={homeTeamLogo}
          alt={homeTeamLogo}
          className="w-24"
        />
        <span className="space-x-1">
          <span>{isPlayed && homeTeamScore}</span>
          <span>-</span>
          <span>{isPlayed && awayTeamScore}</span>
        </span>
        <img
          src={awayTeamLogo}
          alt={awayTeamLogo}
          className="w-24"
        />
      </div>

      {isPlayed && (
        <div className="flex justify-between text-[10px] p-4">
          <GoalList goals={homeTeamGoals} />
          <GoalList goals={awayTeamGoals} />
        </div>
      )}
    </div>
  )
}
