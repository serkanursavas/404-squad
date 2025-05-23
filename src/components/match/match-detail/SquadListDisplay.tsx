import { useNavigate } from 'react-router-dom'
import { Roster } from '../../../types/MatchTypes'
import usePersona from '../../../hooks/usePersona'
import { usePersonas } from '../../../store/PersonasContext'
import { RootState } from '../../../store'
import { useSelector } from 'react-redux'
import PersonaSelect from '../../ui/PersonaSelect'
import { useState } from 'react'
import { Trophy, ClipboardCheck } from 'lucide-react' // Lucide ikonları örnek olarak eklendi
import { motion } from 'framer-motion'
import Tooltip from '../../../utils/Tooltip'
import Watermark from '../../ui/Watermark'
import starIcon from '../../../assets/icons/starAlt.svg'

interface SquadListDisplayProps {
  squad: Roster[]
  isVoted: boolean
  currentPlayerId: number
  canVote: boolean
  mvpId?: number // MVP ID'sini ekledik
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

export default function SquadListDisplay({ squad, isVoted, currentPlayerId, canVote, mvpId }: SquadListDisplayProps) {
  const navigate = useNavigate()

  const { persona } = usePersona()

  // Persona dizisini obje haline getiriyoruz
  const personaMap = persona?.reduce((acc, p) => {
    acc[p.id] = p // ID ile doğrudan erişim sağlıyoruz
    return acc
  }, {} as Record<number, any>) // ID'leri number olarak tanımladık

  const { hasVoted } = useSelector((state: RootState) => state.auth)

  // PersonasContext'ten state ve setter fonksiyonuna erişim
  const { selectedPersonas, setSelectedPersonas, usedSpecialPersonas } = usePersonas()

  // Persona seçimlerini setlemek için kullanılan fonksiyon
  const handlePersonaChange = (playerId: number, selectedOptions: any) => {
    setSelectedPersonas(prevState => ({
      ...prevState,
      [playerId]: selectedOptions ? [...selectedOptions] : [] // Mutable bir array oluştur
    }))
  }

  const categoryOrder = ['special', 'forvet', 'orta_saha', 'defans', 'kaleci', 'teknik', 'takim_dinamigi', 'bireysel'] // istediğin sıralamaya göre ayarla

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
    .sort((a, b) => {
      const indexA = categoryOrder.indexOf(a.category)
      const indexB = categoryOrder.indexOf(b.category)
      return indexA - indexB
    })
    .filter(option => !usedSpecialPersonas.includes(option.value)) // Kullanılan özel personasları filtrele

  return (
    <div className="relative">
      {squad?.map(roster => {
        const [isExpanded, setIsExpanded] = useState(false) // Aç/Kapa state'i

        return (
          <div
            key={roster.id}
            className={`flex flex-col ${
              mvpId === roster.playerId ? 'mvp-row shadow-custom-dark' : ''
            } justify-between p-2 py-3 space-y-1 border-b border-gray-300 cursor-pointer `}
            onClick={() => setIsExpanded(!isExpanded)} // Satıra tıklanınca aç/kapat
          >
            {mvpId === roster.playerId && (
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Watermark
                  watermarkIcon={starIcon}
                  watermarksCount={8}
                  customOpacity={true}
                  customMinSize={20}
                  customMaxSize={40}
                  rotate
                />
              </div>
            )}

            <div className={` z-20 flex items-center justify-between px-2 ${!hasVoted && 'py-2'} space-y-1`}>
              <span
                className={`${currentPlayerId === roster.playerId && 'text-accent'} ${!hasVoted && 'text-sm'}`}
                onClick={e => {
                  e.stopPropagation() // Profil linkine tıklandığında aç/kapat tetiklenmesin
                  navigate(`/profile/${roster.playerId}`)
                }}
              >
                <span>
                  {roster.playerName.split(' ')[0][0]}.{roster.playerName.split(' ').pop()}
                </span>
              </span>
              <span className={`${currentPlayerId === roster.playerId && 'text-accent'} flex items-center justify-center space-x-2`}>
                <span>{isVoted && roster.rating.toFixed(1)} </span>
                {isVoted && roster.persona1 && (
                  <Trophy
                    className="w-5 h-5 animate-pulse"
                    style={{ color: '#FFA500' }}
                  />
                )}
              </span>
              {roster.hasVote && !isVoted && (
                <Tooltip
                  position="left"
                  content={'Oy kullanıldı.'}
                >
                  <ClipboardCheck
                    className="w-7 h-7"
                    style={{ color: '#04764E' }}
                    strokeWidth={2}
                  />
                </Tooltip>
              )}
            </div>

            {isVoted && roster.persona1 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className=""
              >
                <div className="flex text-[10px]  flex-wrap items-center justify-center gap-3 px-2 py-1">
                  {[roster.persona1, roster.persona2, roster.persona3].map(personaId => {
                    if (!personaMap?.[personaId]) return null
                    const persona = personaMap[personaId]

                    return (
                      <div
                        className="relative"
                        key={personaId}
                      >
                        <Tooltip
                          position="top"
                          content={persona.description || 'Açıklama yok'}
                        >
                          {/* Persona İsmi */}
                          <span
                            onClick={e => {
                              e.stopPropagation() // Burada olay yukarı çıkmasın!
                            }}
                            style={{ backgroundColor: categoryColors[persona.category] || '#ddd' }}
                            className="px-3 py-1 text-black cursor-pointer shadow-pixel"
                          >
                            {persona.name || 'Bilinmeyen'}
                          </span>
                        </Tooltip>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {canVote && (
              <div className="flex flex-col">
                <PersonaSelect
                  name={`ratings.${roster.id}.persona`}
                  options={groupedOptions as any}
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
