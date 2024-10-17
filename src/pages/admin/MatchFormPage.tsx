import MatchForm from '../../components/match-form/MatchForm'
import { useMatchFormLogic } from '../../hooks/useMatchFormLogic'
import { SelectOption } from '../../types/FormTypes'

const players: SelectOption[] = [
  { value: '1', label: 'Player 1' },
  { value: '2', label: 'Player 2' },
  { value: '3', label: 'Player 3' },
  { value: '4', label: 'Player 4' },
  { value: '5', label: 'Player 5' },
  { value: '6', label: 'Player 6' },
  { value: '7', label: 'Player 7' },
  { value: '8', label: 'Player 8' },
  { value: '9', label: 'Player 9' },
  { value: '10', label: 'Player 10' },
  { value: '11', label: 'Player 11' },
  { value: '12', label: 'Player 12' }
]

export default function MatchFormPage() {
  const { initialValues, handleSubmit, loading } = useMatchFormLogic()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <MatchForm
      initialValues={initialValues}
      handleSubmit={handleSubmit}
      players={players}
    />
  )
}
