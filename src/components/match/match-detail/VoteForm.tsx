import { useNavigate } from 'react-router-dom'
import { Player } from '../../../types/MatchTypes'
import Button from '../../ui/Button'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import { useState } from 'react'
import SelectInput from '../../form/SelectInput'

interface VoteFormProps {
  squad: Player[]
  handlePlayerVoted: () => void
}

const VoteFormSchema = (currentPlayerId: number) =>
  Yup.object().shape({
    ratings: Yup.array().of(
      Yup.object().shape({
        playerId: Yup.number().required(), // playerId'yi kontrol ediyoruz
        rating: Yup.number()
          .nullable() // Boş bırakılmasına izin veriyoruz
          .test('', '!', function (value, context) {
            const { playerId } = context.parent
            if (playerId === currentPlayerId) {
              // currentPlayerId ile eşleşiyorsa kendine oy veremez, validasyon atlanır
              return true // Bu durumda validasyonu geç
            }
            // Eğer diğer oyuncuysa, rating 1 ile 10 arasında olmalı
            return (value ?? 0) >= 1 && (value ?? 0) <= 10
          })
      })
    )
  })

export default function VoteForm({ squad, handlePlayerVoted }: VoteFormProps) {
  const navigate = useNavigate()
  const currentPlayerId = 7

  const [isBouncing, setIsBouncing] = useState(true)

  return (
    <Formik
      initialValues={{
        ratings: squad.map(player => ({
          playerId: player.id,
          rating: '' // Varsayılan olarak boş, yani seçilmemiş
        }))
      }}
      validationSchema={() => VoteFormSchema(currentPlayerId)}
      onSubmit={values => {
        Swal.fire({
          title: 'Are you sure?',
          text: 'Do you want to save the votes?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#04764E',
          cancelButtonColor: '#D32F2F',
          confirmButtonText: 'Yes',
          customClass: {
            title: 'text-sm', // Set the title font size smaller
            popup: 'text-sm rounded-none' // Set the general font size smaller and remove border radius
          }
        }).then(result => {
          if (result.isConfirmed) {
            console.log('Submitted values:', values)
            handlePlayerVoted()
            Swal.fire('Saved!', 'Your goals have been saved.', 'success')
          }
        })
      }}
    >
      {({ values, setFieldValue, touched, errors }) => (
        <Form className="relative space-y-3">
          {squad?.map((player, index) => (
            <div
              key={player.id}
              className={`flex justify-between items-center space-y-1 border-b border-gray-300 p-2 py-3`}
            >
              <span
                className={`${currentPlayerId === player.id && 'text-accent'}`}
                onClick={() => navigate(`/profile/${player.id}`)}
              >
                {player.name.split(' ').pop()}
              </span>

              <div className="">
                {currentPlayerId !== player.id && (
                  <div className="flex flex-col">
                    <div className="flex flex-row-reverse items-center space-x-2">
                      <SelectInput
                        name={`ratings.${index}.rating`}
                        options={[...Array(10)].map((_, i) => ({ value: (i + 1).toString(), label: (i + 1).toString() }))}
                        placeholder="?"
                        setFieldValue={setFieldValue}
                        borderColor="#C084FC"
                        focusColor="#C084FC"
                        hoverColor="#C084FC"
                        className={`${isBouncing && !values.ratings?.[index]?.rating ? 'animate-bounce' : ''} shadow-pixel `} // Animasyon kontrolü
                        onMenuOpen={() => setIsBouncing(false)} // Menü açıldığında animasyonu durdur
                        onMenuClose={() => setIsBouncing(true)} // Menü kapandığında animasyonu geri getir
                      />

                      {/* Hata mesajı select'in yanına gelecek */}
                      <ErrorMessage
                        name={`ratings.${index}.rating`}
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
              label="Save Votes"
              className="text-white bg-primary"
            />
          </div>
        </Form>
      )}
    </Formik>
  )
}
