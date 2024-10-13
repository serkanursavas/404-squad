import { Formik, Form } from 'formik'
import Input from '../../components/ui/Input'
import SelectInput from '../../components/form/SelectInput'
import Button from '../../components/ui/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { manageMatchValidationSchema } from '../../validators/manageMatchValidation'
import { initialValues as defaultInitialValues } from '../../forms/matchInitialValues'
import { MatchFormData, SelectOption } from '../../types/FormTypes'
import { useEffect, useState } from 'react'

const players: SelectOption[] = [
  { value: 'Player 1', label: 'Player 1' },
  { value: 'Player 2', label: 'Player 2' },
  { value: 'Player 3', label: 'Player 3' },
  { value: 'Player 4', label: 'Player 4' },
  { value: 'Player 5', label: 'Player 5' },
  { value: 'Player 6', label: 'Player 6' },
  { value: 'Player 7', label: 'Player 7' },
  { value: 'Player 8', label: 'Player 8' },
  { value: 'Player 9', label: 'Player 9' },
  { value: 'Player 10', label: 'Player 10' },
  { value: 'Player 11', label: 'Player 11' },
  { value: 'Player 12', label: 'Player 12' }
]

const dummyMatchData = [
  {
    id: 1,
    location: 'Central Stadium',
    matchDate: '2024-10-10',
    matchTime: '18:00',
    teamSize: 11,
    whiteTeam: ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5', 'Player 6'],
    blackTeam: ['Player 7', 'Player 8', 'Player 9', 'Player 10', 'Player 11'],
    isPlayed: false
  },
  {
    id: 2,
    location: 'East Field',
    matchDate: '2024-11-05',
    matchTime: '18:00',
    teamSize: 10,
    whiteTeam: ['Player 12', 'Player 13', 'Player 14', 'Player 15', 'Player 16'],
    blackTeam: ['Player 17', 'Player 18', 'Player 19', 'Player 20', 'Player 21'],
    isPlayed: true
  },
  {
    id: 3,
    location: 'West Arena',
    matchDate: '2024-12-15',
    matchTime: '18:00',
    teamSize: 9,
    whiteTeam: ['Player 22', 'Player 23', 'Player 24', 'Player 25'],
    blackTeam: ['Player 26', 'Player 27', 'Player 28', 'Player 29', 'Player 30'],
    isPlayed: true
  },
  {
    id: 4,
    location: 'North Grounds',
    matchDate: '2024-12-20',
    matchTime: '18:00',
    teamSize: 8,
    whiteTeam: ['Player 31', 'Player 32', 'Player 33', 'Player 34'],
    blackTeam: ['Player 35', 'Player 36', 'Player 37', 'Player 38'],
    isPlayed: true
  }
]

export default function MatchFormPage() {
  const [initialValues, setInitialValues] = useState<MatchFormData>(defaultInitialValues)
  const navigate = useNavigate()
  const { id } = useParams()

  const isEditMode = Boolean(id)

  useEffect(() => {
    if (isEditMode) {
      const numericId = Number(id)
      const match = dummyMatchData.find(match => match.id === numericId)

      if (match) {
        setInitialValues(match)
      }
    } else {
      setInitialValues(defaultInitialValues)
    }
  }, [id, isEditMode])

  const handleSubmit = (values: MatchFormData) => {
    if (isEditMode) {
      console.log('Match Updated', values)
    } else {
      console.log('New Match Created', values)
    }
    navigate('/admin/matches')
  }

  return (
    <div className="">
      <Formik
        initialValues={initialValues}
        validationSchema={manageMatchValidationSchema}
        validateOnBlur={true}
        validateOnChange={true}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ touched, errors, setFieldValue, values }) => {
          const filteredPlayersForWhiteTeam = players.filter(player => !values.blackTeam.includes(player.value))

          const filteredPlayersForBlackTeam = players.filter(player => !values.whiteTeam.includes(player.value))

          return (
            <Form className="flex flex-col justify-center p-5 space-y-8">
              <Input
                label="Match Place"
                name="location"
                type="text"
                min={1}
                error={touched.location && errors.location ? errors.location : false}
              />
              <Input
                label="Match Date"
                name="matchDate"
                type="date"
                min={1}
                error={touched.matchDate && errors.matchDate ? errors.matchDate : false}
              />
              <Input
                label="Match Time"
                name="matchTime"
                type="time"
                min={1}
                error={touched.matchTime && errors.matchTime ? errors.matchTime : false}
              />
              <Input
                label="Team Size"
                name="teamSize"
                type="number"
                min={1}
                error={touched.teamSize && errors.teamSize ? errors.teamSize : false}
              />

              <SelectInput
                label="Select Player for White Team"
                name="whiteTeam"
                options={filteredPlayersForWhiteTeam}
                placeholder="Select a player"
                setFieldValue={(field: string, value: any) => setFieldValue(field, value)}
                error={touched.whiteTeam && typeof errors.whiteTeam === 'string' ? errors.whiteTeam : false}
                teamSize={values.teamSize}
                isMultiSelect
              />

              <SelectInput
                label="Select Player for Black Team"
                name="blackTeam"
                options={filteredPlayersForBlackTeam}
                placeholder="Select a player"
                setFieldValue={(field: string, value: any) => setFieldValue(field, value)}
                error={touched.blackTeam && typeof errors.blackTeam === 'string' ? errors.blackTeam : false}
                teamSize={values.teamSize}
                isMultiSelect
              />

              <Button
                label="Submit"
                type="submit"
              />
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}
