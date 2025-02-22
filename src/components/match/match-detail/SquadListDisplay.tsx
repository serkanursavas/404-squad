import { useNavigate } from 'react-router-dom'
import { Roster } from '../../../types/MatchTypes'
import usePersona from '../../../hooks/usePersona'
import { usePersonas } from '../../../store/PersonasContext'
import { RootState } from '../../../store'
import { useSelector } from 'react-redux'
import PersonaSelect from '../../ui/PersonaSelect'
import { useState } from 'react'
import { motion } from 'framer-motion' // Framer Motion import
import { Trophy } from 'lucide-react' // Lucide ikonları örnek olarak eklendi

interface SquadListDisplayProps {
  squad: Roster[]
  isVoted: boolean
  currentPlayerId: number
  canVote: boolean
}

const categoryColors: Record<string, string> = {
  bireysel: '#bbf7d0', // Daha soft yeşil
  takim_dinamigi: '#fed7aa', // Daha soft turuncu
  kaleci: '#fecaca', // Daha soft kırmızı
  defans: '#c7d2fe', // Daha soft mor
  orta_saha: '#e9d5ff', // Daha soft lavanta
  forvet: '#bae6fd', // Daha soft mavi
  teknik: '#fef08a' // Daha soft sarı
}

export default function SquadListDisplay({ squad, isVoted, currentPlayerId, canVote }: SquadListDisplayProps) {
  const navigate = useNavigate()

  const { persona } = usePersona()

  const { hasVoted } = useSelector((state: RootState) => state.auth)

  // PersonasContext'ten state ve setter fonksiyonuna erişim
  const { selectedPersonas, setSelectedPersonas } = usePersonas()

  // Persona seçimlerini setlemek için kullanılan fonksiyon
  const handlePersonaChange = (playerId: number, selectedOptions: any) => {
    setSelectedPersonas(prevState => ({
      ...prevState,
      [playerId]: selectedOptions ? [...selectedOptions] : [] // Mutable bir array oluştur
    }))
  }

  return (
    <div className="relative">
      {squad?.map(roster => {
        const [isExpanded, setIsExpanded] = useState(false) // Aç/Kapa state'i

        return (
          <div
            key={roster.id}
            className="flex flex-col justify-between p-2 py-3 space-y-1 border-b border-gray-300 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)} // Satıra tıklanınca aç/kapat
          >
            <div className={`flex items-center justify-between px-2 ${!hasVoted && 'py-2'} space-y-1`}>
              <span
                className={`${currentPlayerId === roster.playerId && 'text-accent'} ${!hasVoted && 'text-sm'}`}
                onClick={e => {
                  e.stopPropagation() // Profil linkine tıklandığında aç/kapat tetiklenmesin
                  navigate(`/profile/${roster.playerId}`)
                }}
              >
                {roster.playerName.split(' ')[0][0]}.{roster.playerName.split(' ').pop()}
              </span>
              <span className={`${currentPlayerId === roster.playerId && 'text-accent'} flex items-center justify-center space-x-2`}>
                <span>{isVoted && roster.rating.toFixed(1)} </span>
                {isVoted && (
                  <Trophy
                    className="w-5 h-5 animate-pulse"
                    style={{ color: '#FFA500' }}
                  />
                )}
              </span>
            </div>

            {isVoted && roster.persona1 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} // Başlangıç animasyonu (kapalı)
                animate={isExpanded ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }} // Açık/Kapalı animasyonu
                transition={{ duration: 0.3, ease: 'easeInOut' }} // Geçiş süresi ve efekti
                className="overflow-hidden"
              >
                <div className="flex text-[10px] flex-wrap items-center justify-center gap-3 px-2 py-1">
                  {persona?.[roster.persona1] && (
                    <span
                      style={{
                        backgroundColor: categoryColors[persona[roster.persona1]?.category] || '#ddd'
                      }}
                      className="px-3 py-1 text-black shadow-pixel"
                    >
                      {persona[roster.persona1]?.name || 'Bilinmeyen'}
                    </span>
                  )}
                  {persona?.[roster.persona2] && (
                    <span
                      style={{
                        backgroundColor: categoryColors[persona[roster.persona2]?.category] || '#ddd'
                      }}
                      className="px-3 py-1 text-black shadow-pixel"
                    >
                      {persona[roster.persona2]?.name || 'Bilinmeyen'}
                    </span>
                  )}
                  {persona?.[roster.persona3] && (
                    <span
                      style={{
                        backgroundColor: categoryColors[persona[roster.persona3]?.category] || '#ddd'
                      }}
                      className="px-3 py-1 text-black shadow-pixel"
                    >
                      {persona[roster.persona3]?.name || 'Bilinmeyen'}
                    </span>
                  )}
                </div>
              </motion.div>
            )}

            {canVote && (
              <div className="flex flex-col">
                <PersonaSelect
                  name={`ratings.${roster.id}.persona`}
                  options={
                    [
                      {
                        label: 'Personas',
                        options: persona?.map(persona => ({
                          value: persona.id,
                          label: persona.name,
                          category: persona.category
                        }))
                      }
                    ] as any
                  }
                  isMulti
                  value={selectedPersonas[roster.id] || []}
                  onChange={selectedOptions => handlePersonaChange(roster.id, selectedOptions)}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
