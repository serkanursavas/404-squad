import { useState, useMemo, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AvailablePlayersList from '../../components/admin/goal/AvailablePlayerList'
import GoalsList from '../../components/admin/goal/GoalsList'
import { showConfirmationModal } from '../../utils/showConfirmationModal'
import useMatches from '../../hooks/useMatches'

interface Goals {
  playerId: number
  playerName: string
  teamColor: string
}

export default function MatchGoalsPage() {
  const [goals, setGoals] = useState<Goals[]>([])
  const { useMatchDetails, addGoals } = useMatches()
  const { id } = useParams()
  const [availablePlayers, setAvailablePlayers] = useState<{ value: string; label: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [blackTeamGoals, setBlackTeamGoals] = useState(0)
  const [whiteTeamGoals, setWhiteTeamGoals] = useState(0)

  const navigate = useNavigate()

  const match = useMatchDetails(Number(id))

  const rosters = match?.rosters

  useEffect(() => {
    if (rosters && (match.homeTeamScore <= 0 || match.awayTeamScore <= 0)) {
      const players = rosters.map(player => ({
        value: player.playerId.toString(),
        label: player.playerName
      }))
      setAvailablePlayers(players)
      setLoading(false)
    } else {
      navigate('/')
    }
  }, [rosters])

  const filteredPlayers = useMemo(() => {
    return availablePlayers?.filter(option => !goals.some(goal => goal.playerId.toString() === option.value))
  }, [goals, availablePlayers])

  function saveGoalHandler() {
    const postData = {
      gameId: Number(id),
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
        addGoals(postData)
      },
      {
        title: 'Saved!',
        text: 'Goals have been saved.',
        icon: 'success'
      }
    )
  }

  function submitHandler(values: { playerId: string; goalCount: number }, { resetForm }: { resetForm: () => void }) {
    const player = rosters?.find(player => player.playerId === parseInt(values.playerId))

    if (player) {
      const newGoals = Array.from({ length: values.goalCount }, () => ({
        playerId: player.playerId,
        playerName: player.playerName,
        teamColor: player.teamColor
      }))

      // Add to goals array
      setGoals(prevGoals => [...prevGoals, ...newGoals])

      // Update the number of goals for white and black teams
      if (player.teamColor === 'WHITE') {
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
    const player = rosters?.find(player => player.playerId === id)

    if (player) {
      if (player.teamColor === 'white') {
        setWhiteTeamGoals(prevGoals => prevGoals - countGoals)
      } else {
        setBlackTeamGoals(prevGoals => prevGoals - countGoals)
      }
    }

    setGoals(goals.filter(goal => goal.playerId !== id))

    const availablePlayer = rosters?.find(player => player.playerId === id)
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
