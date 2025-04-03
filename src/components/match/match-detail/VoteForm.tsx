import { useNavigate } from 'react-router-dom'
import { Roster } from '../../../types/MatchTypes'
import Button from '../../ui/Button'
import { Formik, Form, ErrorMessage } from 'formik'

import { useState } from 'react'
import SelectInput from '../../form/SelectInput'
import { showConfirmationModal } from '../../../utils/showConfirmationModal'
import { VoteFormSchema } from '../../../validators/voteFormValidation'
import useRatings from '../../../hooks/useRatings'
import usePersona from '../../../hooks/usePersona'
import { usePersonas } from '../../../store/PersonasContext'
import { PersonasData } from '../../../services/personaService'
import PersonaSelect from '../../ui/PersonaSelect'

interface VoteFormProps {
  squad: Roster[]
  currentPlayerId: number
}

export default function VoteForm({ squad, currentPlayerId }: VoteFormProps) {
  const navigate = useNavigate()

  const { persona } = usePersona()

  const { saveRatings, saveRatingStatus } = useRatings()
  const { handleSavePersonas } = usePersona()

  // Her SelectInput için bağımsız animasyon durumu
  const [isBouncing, setIsBouncing] = useState<{ [key: number]: boolean }>(
    squad.reduce((acc, _, index) => {
      acc[index] = true // Varsayılan olarak tüm SelectInput'lar animasyon yapıyor
      return acc
    }, {} as { [key: number]: boolean })
  )

  const handleMenuOpen = (index: number) => {
    setIsBouncing(prev => ({
      ...prev,
      [index]: false // Menü açıldığında animasyonu durdur
    }))
  }

  const handleMenuClose = (index: number) => {
    setIsBouncing(prev => ({
      ...prev,
      [index]: true // Menü kapandığında animasyonu başlat
    }))
  }

  // PersonasContext'ten state ve setter fonksiyonuna erişim
  const { selectedPersonas, setSelectedPersonas } = usePersonas()

  // Persona seçimlerini setlemek için kullanılan fonksiyon
  const handlePersonaChange = (playerId: number, selectedOptions: any) => {
    setSelectedPersonas(prevState => ({
      ...prevState,
      [playerId]: selectedOptions ? [...selectedOptions] : [] // Mutable bir array oluştur
    }))
  }

  const groupedOptions = persona
    ?.reduce((acc, p) => {
      let group = acc.find(g => g.category === p.category)
      if (!group) {
        group = { category: p.category, items: [] }
        acc.push(group)
      }
      group.items.push({ value: p.id, label: p.name, category: p.category, description: p.description })
      return acc
    }, [] as { category: string; items: { value: number; label: string; category: string; description: string }[] }[])
    .map(group => ({
      ...group,
      items: group.items.sort((a, b) => a.label.localeCompare(b.label)) // Alfabetik sıralama
    }))
    .flatMap(g => g.items) // Sonuç olarak düz bir liste elde ediyoruz

  return (
    <Formik
      initialValues={{
        ratings: squad?.map(roster => ({
          rosterId: roster.id,
          playerId: currentPlayerId,
          rate: roster.playerId === currentPlayerId ? 5 : 0
        }))
      }}
      validationSchema={() => VoteFormSchema()}
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
              .filter(roster => roster.rosterId !== squad.find(player => player.playerId === currentPlayerId)?.id) // Remove current player's rating
              .map(roster => ({
                ...roster,
                rate: Number(roster.rate) // Convert rating to number
              }))

            saveRatings(updatedRosters)
            // selectedPersonas'ı PersonasData[] formatına dönüştür
            const personasData: PersonasData[] = Object.entries(selectedPersonas).map(([rosterId, personas]) => ({
              rosterId: Number(rosterId), // Key'i rosterId olarak kullan
              personaIds: personas.map(persona => persona.value) // Her persona'nın sadece value'sunu al
            }))

            // handleSavePersonas'a doğru formatta veriyi gönder
            handleSavePersonas(personasData)
          }
        )
      }}
    >
      {({ setFieldValue }) => (
        <Form className="relative space-y-3">
          {squad?.map((roster, index) => (
            <div
              key={roster.playerId}
              className={` flex flex-col justify-between space-y-1 border-b border-gray-300 p-2 py-3`}
            >
              <div className="flex items-center justify-between p-2 py-3 space-y-1">
                <span
                  className={`${currentPlayerId === roster.playerId && 'text-accent'} text-sm`}
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
                          className={`${isBouncing[index] ? 'animate-bounce' : ''} shadow-pixel`} // Animasyon kontrolü
                          onMenuOpen={() => handleMenuOpen(index)} // Menü açıldığında animasyonu durdur
                          onMenuClose={() => handleMenuClose(index)} // Menü kapandığında animasyonu başlat
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

              {currentPlayerId !== roster.playerId && (
                <PersonaSelect
                  name={`ratings.${roster.id}.persona`}
                  options={groupedOptions as any}
                  isMulti
                  value={selectedPersonas[roster.id] || []}
                  onChange={selectedOptions => handlePersonaChange(roster.id, selectedOptions)}
                />
              )}
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
