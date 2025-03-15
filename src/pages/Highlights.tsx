import { motion } from 'framer-motion'
import LegendaryDuosList from '../components/player-lists/LegendaryDuosList'
import useTopLists from '../hooks/useTopLists'
import ballIcon from '../assets/icons/ball.png'
import ratingIcon from '../assets/icons/coin.svg'
import linkIcon from '../assets/icons/link.svg'
import swordsIcon from '../assets/icons/swords.svg'
import TopScorerDetailList from '../components/player-lists/TopScorerDetailList'
import TopRatingDetailList from '../components/player-lists/TopRatingDetailList'
import RivalDuosList from '../components/player-lists/RivalDuosList'
import { useEffect } from 'react'

export default function Highlights() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4
      }
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { legendaryDuos, topScorers, topRatedPlayers, rivalDuos } = useTopLists()

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {topRatedPlayers && topRatedPlayers.length > 0 && (
        <motion.div variants={itemVariants}>
          <TopRatingDetailList
            title="Top Rating"
            statisticLabel="Rating"
            watermark={ratingIcon}
            playersData={topRatedPlayers}
          />
        </motion.div>
      )}

      {/* TopRatingDetail */}
      {topScorers && topScorers.length > 0 && (
        <motion.div variants={itemVariants}>
          <TopScorerDetailList
            title="Top Scorers"
            statisticLabel="Goal"
            watermark={ballIcon}
            playersData={topScorers}
          />
        </motion.div>
      )}

      {legendaryDuos && legendaryDuos.length > 0 && (
        <motion.div variants={itemVariants}>
          <LegendaryDuosList
            title="Legendary Duos"
            statisticLabel="Games Together"
            watermark={linkIcon}
            playersData={legendaryDuos}
          />
        </motion.div>
      )}

      {rivalDuos && rivalDuos.length > 0 && (
        <motion.div variants={itemVariants}>
          <RivalDuosList
            title="Rival Duos"
            statisticLabel="Games Against"
            watermark={swordsIcon}
            playersData={rivalDuos}
          />
        </motion.div>
      )}
    </motion.div>
  )
}
