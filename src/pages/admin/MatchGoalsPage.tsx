import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import AvailablePlayersList from '../../components/admin/goal/AvailablePlayerList'
import GoalsList from '../../components/admin/goal/GoalsList'
import { showConfirmationModal } from '../../utils/showConfirmationModal'

const dummyPlayers = [
  { id: 1, playerName: 'John', teamColor: 'black' },
  { id: 2, playerName: 'Emily', teamColor: 'white' },
  { id: 3, playerName: 'Michael', teamColor: 'black' },
  { id: 4, playerName: 'Sophia', teamColor: 'white' },
  { id: 5, playerName: 'David', teamColor: 'black' },
  { id: 6, playerName: 'Emma', teamColor: 'white' },
  { id: 7, playerName: 'James', teamColor: 'black' },
  { id: 8, playerName: 'Olivia', teamColor: 'white' },
  { id: 9, playerName: 'Daniel', teamColor: 'black' },
  { id: 10, playerName: 'Ava', teamColor: 'white' },
  { id: 11, playerName: 'Henry', teamColor: 'black' },
  { id: 12, playerName: 'Isabella', teamColor: 'white' }
]

// Player data for React-select component
const initialPlayers = dummyPlayers.map(player => ({
  value: player.id.toString(),
  label: player.playerName
}))

interface Goals {
  playerId: number
  playerName: string
  teamColor: string
}

export default function MatchGoalsPage() {
  const [goals, setGoals] = useState<Goals[]>([])
  const [availablePlayers, setAvailablePlayers] = useState(initialPlayers)

  // State for the number of goals for white and black teams
  const [whiteTeamGoals, setWhiteTeamGoals] = useState(0)
  const [blackTeamGoals, setBlackTeamGoals] = useState(0)

  const { id } = useParams()

  // Memoize available players to avoid unnecessary recalculations
  const filteredPlayers = useMemo(() => {
    return availablePlayers.filter(option => !goals.some(goal => goal.playerId.toString() === option.value))
  }, [goals, availablePlayers])

  function saveGoalHandler() {
    const postData = {
      gameId: id,
      goals: goals.map(goals => ({ playerId: goals.playerId, teamColor: goals.teamColor }))
    }

    showConfirmationModal(
      {
        title: 'Are you sure?',
        text: 'Do you want to save the goals?',
        icon: 'warning',
        confirmButtonText: 'Yes'
      },
      () => {
        console.log(postData)
      },
      {
        title: 'Saved!',
        text: 'Goals have been saved.',
        icon: 'success'
      }
    )
  }

  function submitHandler(values: { playerId: string; goalCount: number }, { resetForm }: { resetForm: () => void }) {
    const player = dummyPlayers.find(player => player.id === parseInt(values.playerId))

    if (player) {
      const newGoals = Array.from({ length: values.goalCount }, () => ({
        playerId: player.id,
        playerName: player.playerName,
        teamColor: player.teamColor
      }))

      // Add to goals array
      setGoals(prevGoals => [...prevGoals, ...newGoals])

      // Update the number of goals for white and black teams
      if (player.teamColor === 'white') {
        setWhiteTeamGoals(prevGoals => prevGoals + values.goalCount)
      } else {
        setBlackTeamGoals(prevGoals => prevGoals + values.goalCount)
      }

      // Reset the form
      resetForm()
    }
  }

  function handleGoalRemove(id: number) {
    const countGoals = goals.filter(goal => goal.playerId === id).length
    const player = dummyPlayers.find(player => player.id === id)

    if (player) {
      if (player.teamColor === 'white') {
        setWhiteTeamGoals(prevGoals => prevGoals - countGoals)
      } else {
        setBlackTeamGoals(prevGoals => prevGoals - countGoals)
      }
    }

    setGoals(goals.filter(goal => goal.playerId !== id))

    const availablePlayer = dummyPlayers.find(player => player.id === id)
    if (availablePlayer) {
      setAvailablePlayers(prevState => {
        if (!prevState.find(player => player.value === availablePlayer.id.toString())) {
          const updatedPlayers = [...prevState, { value: availablePlayer.id.toString(), label: availablePlayer.playerName }]
          return updatedPlayers
        }
        return prevState
      })
    }
  }

  return (
    <div>
      <AvailablePlayersList
        availablePlayers={filteredPlayers}
        submitHandler={submitHandler}
        saveGoalHandler={saveGoalHandler}
      />

      {goals.length > 0 && (
        <div>
          <div className="flex justify-between p-2 my-4 border border-black">
            <div>White</div>
            <div>
              <span>{whiteTeamGoals}</span> - <span>{blackTeamGoals}</span>
            </div>
            <div>Black</div>
          </div>
          <h3>Goals List:</h3>
          <GoalsList
            goals={goals}
            handleGoalRemove={handleGoalRemove}
          />
        </div>
      )}
    </div>
  )
}
