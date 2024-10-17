import Button from '../../components/ui/Button'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
import { playerUpdateValidationSchema } from '../../validators/playerUpdateValidation'
import { Field, FieldProps, Form, Formik, ErrorMessage } from 'formik'
import Input from '../../components/ui/Input'
import SelectInput from '../../components/form/SelectInput'
import { SelectOption } from '../../types/FormTypes'
import { Player } from '../../services/playerService'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { toast } from 'react-toastify'
import usePlayer from '../../hooks/usePlayers'

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
  const [player, setPlayer] = useState<Player | null>(null)
  const { players } = useSelector((state: RootState) => state.players)
  const { updatePlayer } = usePlayer()

  const playerToUpdate = useMemo(() => {
    if (id) {
      const playerId = parseInt(id)
      return players.find((player: Player) => player.id === playerId)
    }
    return null
  }, [id, players])

  useEffect(() => {
    if (playerToUpdate) {
      setPlayer(playerToUpdate)
    }
  }, [playerToUpdate])

  const handleSubmit = async (values: Player) => {
    const updatedFields = Object.keys(values).reduce((acc, key) => {
      if (player && values[key as keyof Player] !== player[key as keyof Player]) {
        acc[key as keyof Player] = values[key as keyof Player] as any
      }
      return acc
    }, {} as Partial<Player>)

    if (Object.keys(updatedFields).length > 0) {
      updatePlayer({ updatedData: values })
    } else {
      toast('No changes detected!')
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
                    label="Update"
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
