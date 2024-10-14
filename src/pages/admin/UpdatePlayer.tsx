import Button from '../../components/ui/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { dummyPlayerInfo } from '../../dummyData/PlayerData'
import { PlayerInfo } from '../../types/PlayerTypes'
import { playerUpdateValidationSchema } from '../../validators/playerUpdateValidation'
import { Field, FieldProps, Form, Formik, ErrorMessage } from 'formik'
import Input from '../../components/ui/Input'
import SelectInput from '../../components/form/SelectInput'
import { SelectOption } from '../../types/FormTypes'

const position: SelectOption[] = [
  { value: 'Goalkeeper', label: 'Goalkeeper' },
  { value: 'Defender', label: 'Defender' },
  { value: 'Midfielder', label: 'Midfielder' },
  { value: 'Forward', label: 'Forward' }
]

const foot: SelectOption[] = [
  { value: 'left', label: 'Left' },
  { value: 'right', label: 'Right' },
  { value: 'both', label: 'Both' }
]

export default function UpdatePlayer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [player, setPlayer] = useState<PlayerInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (id) {
      const playerId = parseInt(id)
      const playerToUpdate = dummyPlayerInfo.find(player => player.id === playerId)

      if (playerToUpdate) {
        setPlayer(playerToUpdate)
      }
    }
  }, [id])

  const handleSubmit = async (values: PlayerInfo) => {
    setIsLoading(true)
    const updatedFields = Object.keys(values).reduce((acc, key) => {
      if (player && values[key as keyof PlayerInfo] !== player[key as keyof PlayerInfo]) {
        acc[key as keyof PlayerInfo] = values[key as keyof PlayerInfo] as any
      }
      return acc
    }, {} as Partial<PlayerInfo>)

    await new Promise(resolve => setTimeout(resolve, 2000))

    if (Object.keys(updatedFields).length > 0) {
      console.log('Fields to update:', updatedFields)
      console.log('User updated successfully', values)
      alert('User has been updated successfully!')
      setIsLoading(false)
      navigate('/admin/players')
    } else {
      alert('No changes detected!')
      console.log('No fields were updated.')
      setIsLoading(false)
    }
  }

  if (!player) {
    return <div>Loading...</div>
  }

  return (
    <div className="mx-auto bg-white md:w-6/12">
      <Formik
        initialValues={player}
        onSubmit={handleSubmit}
        enableReinitialize
        validationSchema={playerUpdateValidationSchema}
      >
        {({ touched, errors, setFieldValue }) => {
          return (
            <Form className="p-8">
              <h1 className="text-2xl text-center text-primary">Update Player</h1>
              <div className="flex flex-col pt-4 space-y-10">
                <Input
                  label="Name"
                  name="name"
                  type="text"
                  error={touched.name && errors.name ? errors.name : false}
                />
                <Input
                  label="Surname"
                  name="surname"
                  type="text"
                  error={touched.surname && errors.surname ? errors.surname : false}
                />
                <SelectInput
                  label="Position"
                  name="position"
                  options={position}
                  placeholder="Select position"
                  setFieldValue={(field, value) => setFieldValue(field, value)}
                  error={touched.position && errors.position ? errors.position : false}
                />
                <SelectInput
                  label="Foot"
                  name="foot"
                  options={foot}
                  placeholder="Select foot"
                  setFieldValue={(field, value) => setFieldValue(field, value)}
                  error={touched.foot && errors.foot ? errors.foot : false}
                />

                <Field name="photo">
                  {({ form }: FieldProps) => (
                    <div>
                      <label
                        htmlFor="photo"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Photo
                      </label>
                      <input
                        id="photo"
                        name="photo"
                        type="file"
                        onChange={event => {
                          const file = event.currentTarget.files?.[0]
                          form.setFieldValue('photo', file)
                        }}
                        className="block w-full mt-1 text-sm text-gray-900 border border-gray-300 rounded-md"
                      />
                      <ErrorMessage
                        name="photo"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>
                  )}
                </Field>
                <div>
                  <Button
                    type="submit"
                    className="text-white bg-primary"
                    label={isLoading ? 'Updating...' : 'Update'}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}
