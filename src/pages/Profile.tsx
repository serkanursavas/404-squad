import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import playerRaiting from '../assets/icons/starAlt.svg'
import playerPosition from '../assets/icons/position.svg'
import PlayerInfoItem from '../components/profile/PlayerInfoItem'
import { useEffect, useMemo, useRef, useState } from 'react'
import playerService, { Player } from '../services/playerService'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import unknownPicture from '../assets/images/unknown-player.png'
import PixelSpinner from '../components/ui/PixelSpinner'
import { Crown, Trophy, Medal } from 'lucide-react' // Lucide ikonları örnek olarak eklendi
import PlayerRatingChart from '../components/profile/PlayerRatingLineChart'

export default function Profile() {
  const { id } = useParams()

  const [player, setPlayer] = useState<Player | null>(null)
  const { players } = useSelector((state: RootState) => state.players)

  const playerId = id ? parseInt(id) : 0

  const playerFromRedux = useMemo(() => {
    return players?.find(player => player.id === playerId)
  }, [id, players])

  const { data: playerFromAPI } = useQuery<Player, Error>({
    queryKey: ['player', playerId],
    queryFn: () => playerService.getPlayerById(playerId),
    enabled: !playerFromRedux
  })

  useEffect(() => {
    console.log('Player from Redux:', playerFromRedux)

    window.scrollTo(0, 0)
    if (playerFromRedux) {
      setPlayer(playerFromRedux)
    } else if (playerFromAPI) {
      setPlayer(playerFromAPI)
    }
  }, [playerFromRedux, playerFromAPI])

  if (!playerFromAPI && !playerFromRedux) {
    return (
      <div className="absolute top-0 left-0 z-0 flex items-center justify-center w-screen h-screen ">
        <PixelSpinner />
      </div>
    )
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

  const formattedRating = player?.rating !== undefined && player?.rating !== null ? Math.round(player?.rating * 10) / 10 : 0

  // Animasyon varyantları
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2 // Her çocuk bileşen arasında gecikme
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  // Her arka plan rengine uygun ikon renkleri
  const iconColors = ['#E63946', '#FFA500', '#1D3557', '#2A9D8F']

  const [openIndex, setOpenIndex] = useState<number | null>(null) // Açılan persona'yı takip eden state
  const containerRef = useRef<HTMLDivElement>(null) // Div'in referansını alıyoruz

  // Sayfanın herhangi bir yerine tıklanınca açıklamayı kapat
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenIndex(null) // Dışarı tıklanınca kapat
      }
    }

    document.addEventListener('mousedown', handleClickOutside) // Tıklama olayını dinle
    return () => {
      document.removeEventListener('mousedown', handleClickOutside) // Temizle
    }
  }, [])

  // İkonlar dinamik renklerle tanımlandı
  const icons = [
    <Crown
      className="w-6 h-6"
      style={{ color: iconColors[0] }}
    />, // Taç: Liderlik
    <Trophy
      className="w-6 h-6"
      style={{ color: iconColors[1] }}
    />, // Kupa: Başarı
    <Medal
      className="w-6 h-6"
      style={{ color: iconColors[2] }}
    /> // Madalya: Derece
  ]

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center space-y-6 "
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Resim Bölümü */}
      <motion.div
        className={`relative flex flex-col items-center w-full px-12 pt-8 ${!player?.active ? 'grayscale ' : ''}`}
        variants={itemVariants}
      >
        <div className="absolute w-screen h-full -mt-12 bg-gradient-to-t from-primary to-neutral opacity-80"></div>
        <motion.img
          src={unknownPicture}
          className={`z-10 w-56 ${!player?.active ? '' : ''}`}
          alt="player Photo"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />
        <motion.div
          className={`z-10 w-full py-2 text-center text-lg ${
            !player?.active ? 'bg-gray-300 text-gray-500' : 'bg-white text-primary'
          } shadow-custom-dark`}
          variants={itemVariants}
        >
          {player?.name} {player?.surname}
        </motion.div>
      </motion.div>

      <PlayerRatingChart ratings={player?.last5GameRating?.map(rating => Number(rating)).reverse() || []} />

      {/* Persona Rozetleri */}
      <div
        ref={containerRef}
        className="flex flex-col items-center justify-center w-full gap-3 p-4"
      >
        {player?.personas?.slice(0, 3).map((persona, index) => {
          const scaleValue = 1 - index * 0.05 // Her index için %5 küçültme
          const delay = index * 0.2 // Her element için gecikme süresi
          const isOpen = openIndex === index // Sadece tıklanan persona'nın açıklaması açılacak

          return (
            <div
              key={index}
              className="relative w-full"
            >
              {/* Persona Rozeti */}
              <motion.div
                className="flex flex-row items-center justify-start w-full h-10 px-4 text-center border-2 border-indigo-400 cursor-pointer shadow-pixel"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: scaleValue }}
                transition={{
                  duration: 0.6,
                  delay: delay,
                  type: 'spring'
                }}
                style={{
                  backgroundColor: categoryColors[persona.category] || '#ffffff'
                }}
                onClick={() => setOpenIndex(isOpen ? null : index)} // Aç/Kapat işlemi
              >
                {/* Sıra simgesi */}
                <div className="flex items-center justify-center w-6 h-6 mr-3">{icons[index]}</div>
                {/* Persona ismi */}
                <span className="text-xs font-bold text-black">{persona.personaName}</span>
              </motion.div>

              {/* Tooltip Açıklama (Sadece tıklanan persona için açılacak) */}
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-0 z-40 w-64 p-2 mt-2 text-xs text-white bg-[#4B5563] border border-gray-500 rounded shadow-lg"
                >
                  <p>{persona.personaDescription || 'Açıklama bulunmuyor.'}</p>
                </motion.div>
              )}
            </div>
          )
        })}
      </div>

      {/* Bilgi Bölümü */}
      <motion.div
        className="grid items-center w-full h-40 grid-cols-2 gap-6 p-4 mx-2 text-sm justify-items-center "
        variants={itemVariants}
      >
        <PlayerInfoItem
          text={String(formattedRating)}
          icon={playerRaiting}
        />
        <PlayerInfoItem
          text={player?.position || ''}
          icon={playerPosition}
        />
      </motion.div>
    </motion.div>
  )
}
