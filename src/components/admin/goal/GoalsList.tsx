// Yeni GoalsList bileşeni
import { useMemo } from 'react'
import trashIcon from '../../../assets/icons/Trash.svg'

interface Goal {
  playerId: number
  playerName: string
  teamColor: string
}

interface GoalsListProps {
  goals: Goal[]
  handleGoalRemove: (playerId: number) => void
}

function GoalsList({ goals, handleGoalRemove }: GoalsListProps) {
  const groupedGoals = useMemo(() => {
    // Bu işlem goals listesini gruplar
    return goals.reduce((acc: { [key: string]: { count: number; playerId: number; teamColor: string } }, goal: Goal) => {
      if (acc[goal.playerName]) {
        acc[goal.playerName].count += 1
      } else {
        acc[goal.playerName] = { count: 1, playerId: goal.playerId, teamColor: goal.teamColor }
      }
      return acc
    }, {})
  }, [goals]) // goals değiştiğinde yeniden hesaplama yapılır

  return (
    <ul className="px-8 py-2 space-y-4">
      {Object.keys(groupedGoals).map((playerName, index) => (
        <li
          key={index}
          className="relative flex items-center justify-between px-4 py-2 pl-16 bg-white border border-black shadow-pixel"
        >
          <span
            className={`absolute top-0 left-0 flex items-center justify-center w-12 h-full 
              ${groupedGoals[playerName].teamColor === 'white' ? 'bg-neutral' : ' bg-black text-white'}
              `}
          >
            {groupedGoals[playerName].teamColor === 'white' ? 'W' : 'B'}
          </span>

          <span>{playerName}</span>

          <div className="flex items-center space-x-2">
            <span className="">x{groupedGoals[playerName].count} </span>
            <img
              src={trashIcon}
              onClick={() => handleGoalRemove(groupedGoals[playerName].playerId)}
              className="p-1 pb-2 cursor-pointer"
              alt="Remove goal"
            />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default GoalsList
