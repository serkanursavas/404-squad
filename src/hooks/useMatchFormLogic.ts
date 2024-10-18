import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MatchFormData } from '../types/FormTypes'
import { convertMatchToFormData, activePlayersToSelectOptions, convertFormDataToCreateMatchRequest } from '../utils/match-utils'
import { initialValues as defaultInitialValues } from '../forms/matchInitialValues'
import useMatches from './useMatches'
import usePlayer from './usePlayers'

export function useMatchFormLogic() {
  const [initialValues, setInitialValues] = useState<MatchFormData>(defaultInitialValues)
  const navigate = useNavigate()
  const { id } = useParams()
  const { useMatchDetails, createMatch } = useMatches()
  const [loading, setLoading] = useState(true)
  const { players } = usePlayer()

  const selectPlayers = activePlayersToSelectOptions(players || [])

  const match = useMatchDetails(Number(id))
  const isEditMode = Boolean(id)

  useEffect(() => {
    if (isEditMode && match) {
      const formattedMatch = convertMatchToFormData(match)
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
      console.log('Match Updated', values)
    } else {
      const convertedMatchData = convertFormDataToCreateMatchRequest(values)

      convertedMatchData.weather = 'Sunny'

      createMatch(convertedMatchData)
    }
    navigate('/admin/matches')
  }

  return {
    initialValues,
    handleSubmit,
    loading,
    isEditMode,
    selectPlayers
  }
}
