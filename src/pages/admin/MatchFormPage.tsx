import MatchForm from '../../components/match-form/MatchForm'
import { useMatchFormLogic } from '../../hooks/useMatchFormLogic'

export default function MatchFormPage() {
  const { initialValues, handleSubmit, loading, selectPlayers } = useMatchFormLogic()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <MatchForm
      initialValues={initialValues}
      handleSubmit={handleSubmit}
      players={selectPlayers}
    />
  )
}
