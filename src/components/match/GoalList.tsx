import { useNavigate } from 'react-router-dom'

import { Goal } from '../../types/MatchTypes'

import ballIcon from '../../assets/icons/ball.png'
import Icons from '../ui/Icons'

interface GoalListProps {
  goals: Goal[]
}

export default function GoalList({ goals }: GoalListProps) {
  const navigate = useNavigate()

  return (
    <div className="space-y-1">
      {goals.map((goal, index) => {
        return (
          <div
            key={index}
            onClick={() => navigate(`/profile/${goal.id}`)}
            className={`flex items-center space-x-1`}
          >
            <Icons
              src={ballIcon}
              className="w-5"
            />
            <span>{goal.playerName.split(' ')[0]}</span>
          </div>
        )
      })}
    </div>
  )
}
