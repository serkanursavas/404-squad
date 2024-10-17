import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MatchFormData } from '../types/FormTypes'
import { convertMatchToFormData } from '../utils/match-utils'
import { initialValues as defaultInitialValues } from '../forms/matchInitialValues'
import useMatches from './useMatches'

export function useMatchFormLogic() {
  const [initialValues, setInitialValues] = useState<MatchFormData>(defaultInitialValues)
  const navigate = useNavigate()
  const { id } = useParams()
  const { useMatchDetails } = useMatches()
  const [loading, setLoading] = useState(true)

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
      console.log('New Match Created', values)
      // createMatch logic can be added here
    }
    navigate('/admin/matches')
  }

  return {
    initialValues,
    handleSubmit,
    loading,
    isEditMode
  }
}
