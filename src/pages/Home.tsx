import { motion } from 'framer-motion'
import Banner from '../components/match/Banner'
import ballIcon from '../assets/icons/ball.png'
import trendIcon from '../assets/icons/trend.svg'
import MvpCard from '../components/player-lists/MvpCard'
import useMatches from '../hooks/useMatches'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import useTopLists from '../hooks/useTopLists'
import usePlayer from '../hooks/usePlayers'
import PixelSpinner from '../components/ui/PixelSpinner'
import TopScorerList from '../components/player-lists/TopScorerList'
import FormTrendList from '../components/player-lists/FormTrendList'

export default function Home() {
  useMatches(false, true)
  const reduxNextMatch = useSelector((state: RootState) => state.matches.nextMatch)

  const { topScorers, topRatedPlayers, topFormPlayers } = useTopLists()
  const { mvpData } = usePlayer()

  if (!reduxNextMatch || !topScorers || !topRatedPlayers || !mvpData) {
    return (
      <div className="absolute top-0 left-0 z-0 flex items-center justify-center w-screen h-screen ">
        <PixelSpinner />
      </div>
    )
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {reduxNextMatch && (
        <motion.div variants={itemVariants}>
          <Banner match={reduxNextMatch} />
        </motion.div>
      )}

      {mvpData && (
        <motion.div variants={itemVariants}>
          <MvpCard player={mvpData} />
        </motion.div>
      )}

      {topScorers && topScorers.length > 0 && (
        <motion.div variants={itemVariants}>
          <TopScorerList
            title="Top Scorer"
            statisticLabel="Goal"
            watermark={ballIcon}
            playersData={topScorers}
          />
        </motion.div>
      )}

      {topFormPlayers && topFormPlayers.length > 0 && (
        <motion.div variants={itemVariants}>
          <FormTrendList
            title="Form Trend"
            statisticLabel="Form"
            watermark={trendIcon}
            playersData={topFormPlayers}
          />
        </motion.div>
      )}
    </motion.div>
  )
}
