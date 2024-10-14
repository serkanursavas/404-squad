import { useNavigate } from 'react-router-dom'

import { Goal } from '../../types/MatchTypes'
import ballIcon from '../../assets/icons/ball.png'
import Icons from '../ui/Icons'

interface GoalListProps {
  goals: Goal[]
}

export default function GoalList({ goals }: GoalListProps) {
  const navigate = useNavigate()

  const groupedGoals = goals.reduce((acc, goal) => {
    if (!acc[goal.playerId]) {
      acc[goal.playerId] = { playerId: goal.playerId.toString(), playerName: goal.playerName, count: 0, goals: [] }
    }
    acc[goal.playerId].count += 1
    acc[goal.playerId].goals.push(goal)
    return acc
  }, {} as Record<string, { playerId: string; playerName: string; count: number; goals: Goal[] }>)

  return (
    <div className="space-y-1">
      {Object.values(groupedGoals).map((goal, index) => {
        return (
          <div
            key={index}
            onClick={() => navigate(`/profile/${goal.playerId}`)}
            className={`flex items-center space-x-1`}
          >
            {goal.count > 1 ? <span className="w-5 text-accent">x{goal.count}</span> : <span className="w-5"></span>}

            <Icons
              src={ballIcon}
              className="w-5"
            />
            <span>
              {goal.playerName.split(' ')[0][0]}.{goal.playerName.split(' ').pop()}
            </span>
          </div>
        )
      })}
    </div>
  )
}
