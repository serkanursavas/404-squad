import GoalList from '../GoalList'
import homeTeamLogo from '../../../assets/images/club-black.svg'
import awayTeamLogo from '../../../assets/images/club-white.svg'
import { Goal } from '../../../types/MatchTypes'

export default function Scoreboard({
  homeTeamScore,
  awayTeamScore,
  goals,
  played,
  twist
}: {
  homeTeamScore: number
  awayTeamScore: number
  goals: Goal[]
  played: boolean
  twist: boolean
}) {
  const homeTeamGoals = goals?.filter(goal => goal.teamColor === 'BLACK')
  const awayTeamGoals = goals?.filter(goal => goal.teamColor === 'WHITE')

  return (
    <div className={` border-2 border-black shadow-pixel `}>
      <div className={`flex items-center justify-between px-2 py-2 text-3xl ${twist ? 'flex-row-reverse' : 'flex-row'}`}>
        <img
          src={homeTeamLogo}
          alt={homeTeamLogo}
          className="w-24"
        />
        <span className={`space-x-1 flex ${twist ? 'flex-row-reverse' : 'flex-row'}`}>
          <span>{homeTeamScore > 0 && homeTeamScore}</span>
          <span>-</span>
          <span>{awayTeamScore > 0 && awayTeamScore}</span>
        </span>
        <img
          src={awayTeamLogo}
          alt={awayTeamLogo}
          className="w-24"
        />
      </div>

      {played && goals && goals.length > 0 && (
        <div className={`flex justify-between text-[10px] p-4 ${twist ? 'flex-row-reverse' : 'flex-row'}`}>
          <GoalList goals={homeTeamGoals} />
          <GoalList goals={awayTeamGoals} />
        </div>
      )}
    </div>
  )
}
