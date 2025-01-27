import { Formik, Form } from 'formik'
import { manageMatchValidationSchema } from '../../validators/manageMatchValidation'
import { MatchFormData, SelectOption } from '../../types/FormTypes'
import Input from '../ui/Input'
import SelectInput from '../form/SelectInput'
import Button from '../ui/Button'
import { useEffect, useState } from 'react'
import { GameLocation } from '../../services/matchService'
import axiosInstance from '../../services/axiosInstance'
import { CustomError } from '../../hooks/useAuth'

interface MatchFormProps {
  initialValues: MatchFormData
  handleSubmit: (values: MatchFormData) => void
  players: SelectOption[]
  handleDeleteMatch: (id: number) => void
}

export default function MatchForm({ initialValues, handleSubmit, players, handleDeleteMatch }: MatchFormProps) {
  const [gameLocations, setGameLocations] = useState<GameLocation[]>([])

  useEffect(() => {
    const fetchGameLocations = async () => {
      try {
        const response = await axiosInstance.get<GameLocation[]>('/games/getGameLocations')
        setGameLocations(response.data)
      } catch (error: any) {
        const customError = new Error(error.response?.data?.message || error.message || 'An unknown error occurred') as CustomError
        customError.status = error.response?.status || 500
        customError.details = error.response?.data?.details || 'No additional details available'
        throw customError
      }
    }

    fetchGameLocations()
  }, [])

  return (
    <Formik
      key={JSON.stringify(initialValues)}
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
            <SelectInput
              label="Match Place"
              name="location"
              options={gameLocations.map(location => ({ value: location.id.toString(), label: location.location }))}
              placeholder="Match Place"
              setFieldValue={(field: string, value: any) => setFieldValue(field, value)}
              error={touched.location && typeof errors.location === 'string' ? errors.location : false}
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
            {values.id && (
              <Button
                type="button"
                label="Cancel Match"
                className="text-white bg-primary-error"
                onClick={() => values.id !== null && handleDeleteMatch(values.id)}
              />
            )}
          </Form>
        )
      }}
    </Formik>
  )
}
