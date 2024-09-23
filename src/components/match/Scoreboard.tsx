import { Team } from '../../types/MatchTypes'
import GoalList from './GoalList'

export default function Scoreboard({ team1, team2 }: { team1: Team; team2: Team }) {
  return (
    <div className="border-2 border-black shadow-pixel">
      <div className="flex items-center justify-between px-2 py-2 text-3xl ">
        <img
          src={team1.logo}
          alt={team1.name}
          className="w-24"
        />
        <span className="space-x-1">
          <span>{team1.score}</span>
          <span>-</span>
          <span>{team2.score}</span>
        </span>
        <img
          src={team2.logo}
          alt={team2.name}
          className="w-24"
        />
      </div>

      <div className="flex justify-between text-[10px] p-4">
        <GoalList goals={team1.goals} />
        <GoalList goals={team2.goals} />
      </div>
    </div>
  )
}
