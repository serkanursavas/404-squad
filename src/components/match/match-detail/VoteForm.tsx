import { useNavigate } from 'react-router-dom'
import { Roster } from '../../../types/MatchTypes'
import Button from '../../ui/Button'
import { Formik, Form, ErrorMessage } from 'formik'

import { useState } from 'react'
import SelectInput from '../../form/SelectInput'
import { showConfirmationModal } from '../../../utils/showConfirmationModal'
import { VoteFormSchema } from '../../../validators/voteFormValidation'
import useRatings from '../../../hooks/useRatings'

interface VoteFormProps {
  squad: Roster[]
  currentPlayerId: number
}

export default function VoteForm({ squad, currentPlayerId }: VoteFormProps) {
  const navigate = useNavigate()

  const { saveRatings, saveRatingStatus } = useRatings()

  const [isBouncing, setIsBouncing] = useState(true)

  return (
    <Formik
      initialValues={{
        ratings: squad?.map(roster => ({
          rosterId: roster.id,
          playerId: currentPlayerId,
          rate: 0
        }))
      }}
      validationSchema={() => VoteFormSchema(currentPlayerId)}
      onSubmit={values => {
        showConfirmationModal(
          {
            title: 'Are you sure?',
            text: 'Do you want to save the votes?',
            icon: 'warning',
            confirmButtonText: 'Yes'
          },
          () => {
            const updatedRosters = values.ratings
              .filter(roster => roster.rate !== 0) // Remove object where rating is 0
              .map(roster => ({
                ...roster,
                rate: Number(roster.rate) // Convert rating to number
              }))

            saveRatings(updatedRosters)
          },
          {
            title: 'Saved!',
            text: 'Your votes have been saved.',
            icon: 'success'
          }
        )
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="relative space-y-3">
          {squad?.map((roster, index) => (
            <div
              key={roster.playerId}
              className={`flex justify-between items-center space-y-1 border-b border-gray-300 p-2 py-3`}
            >
              <span
                className={`${currentPlayerId === roster.playerId && 'text-accent'}`}
                onClick={() => navigate(`/profile/${roster.playerId}`)}
              >
                {roster.playerName.split(' ')[0][0]}.{roster.playerName.split(' ').pop()}
              </span>

              <div className="">
                {currentPlayerId !== roster.playerId && (
                  <div className="flex flex-col">
                    <div className="flex flex-row-reverse items-center space-x-2">
                      <SelectInput
                        name={`ratings.${index}.rate`}
                        options={[...Array(10)].map((_, i) => ({ value: (i + 1).toString(), label: (i + 1).toString() }))}
                        placeholder="?"
                        setFieldValue={setFieldValue}
                        borderColor="#C084FC"
                        focusColor="#C084FC"
                        hoverColor="#C084FC"
                        className={`${isBouncing && !values.ratings?.[index]?.rate ? 'animate-bounce' : ''} shadow-pixel `} // Animation control
                        onMenuOpen={() => setIsBouncing(false)} // Stop animation when menu opens
                        onMenuClose={() => setIsBouncing(true)} // Bring back animation when menu closes
                      />

                      <ErrorMessage
                        name={`ratings.${index}.rate`}
                        component="div"
                        className="text-xl text-red-500 "
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="py-2 text-right">
            <Button
              type="submit"
              label={saveRatingStatus === 'pending' ? 'Saving...' : 'Save Votes'}
              className="text-white bg-primary"
              disabled={saveRatingStatus === 'pending'} // saveRatingStatus durumuna göre butonu disable ediyoruz
            />
          </div>
        </Form>
      )}
    </Formik>
  )
}
