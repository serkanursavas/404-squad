import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MatchFormData } from '../types/FormTypes'
import { convertMatchToFormData, activePlayersToSelectOptions, convertFormDataToMatchRequest, createUpdatedMatchRequest } from '../utils/match-utils'
import { initialValues as defaultInitialValues } from '../forms/matchInitialValues'
import useMatches from './useMatches'
import usePlayer from './usePlayers'
import { showConfirmationModal } from '../utils/showConfirmationModal'
import { Roster } from '../services/matchService'

export function useMatchFormLogic() {
  const [initialValues, setInitialValues] = useState<MatchFormData>(defaultInitialValues)
  const [rosters, setRosters] = useState<Roster[]>([])
  const navigate = useNavigate()
  const { id } = useParams()
  const { useMatchDetails, createMatch, deleteMatch, updateMatch } = useMatches()
  const [loading, setLoading] = useState(true)
  const { players } = usePlayer()

  const selectPlayers = activePlayersToSelectOptions(players || [])

  const isEditMode = Boolean(id)

  const match = isEditMode ? useMatchDetails(Number(id)) : null

  useEffect(() => {
    if (isEditMode && match) {
      const formattedMatch = convertMatchToFormData(match)
      setRosters(match.rosters)

      if (JSON.stringify(initialValues) !== JSON.stringify(formattedMatch)) {
        setInitialValues(formattedMatch)
      }
    } else if (!isEditMode) {
      setInitialValues(defaultInitialValues)
    }
    setLoading(false)
  }, [isEditMode, match])

  const handleSubmit = (values: MatchFormData) => {
    if (isEditMode) {
      const updatedMatchData = createUpdatedMatchRequest(values, rosters)

      console.log(updatedMatchData)

      updateMatch({ id: Number(updatedMatchData.id), updateMatchData: updatedMatchData })
    } else {
      const convertedMatchData = convertFormDataToMatchRequest(values)

      createMatch(convertedMatchData)
    }
    navigate('/admin/matches')
  }

  const handleDeleteMatch = (id: number): void => {
    showConfirmationModal(
      {
        title: 'Are you sure?',
        text: 'Do you want to delete match?',
        icon: 'error',
        confirmButtonText: 'Delete',
        cancelButtonColor: '#04764E',
        confirmButtonColor: '#D32F2F'
      },
      () => {
        deleteMatch(id)
      }
    )
  }

  return {
    initialValues,
    handleSubmit,
    loading,
    isEditMode,
    selectPlayers,
    handleDeleteMatch
  }
}
