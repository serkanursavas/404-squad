import { Match } from '../../services/matchService'
import MatchCard from './MatchCard'
import { motion } from 'framer-motion'

type MatchesListProps = {
  matchesData: Match[]
}

export default function MatchesList({ matchesData }: MatchesListProps) {
  const activeMatches = matchesData?.filter(match => match.played)

  return (
    <>
      {activeMatches?.map((match, index) => {
        const isEven = index % 2 === 0

        const variants = {
          hidden: { opacity: 0, x: isEven ? -50 : 50 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
        }

        return (
          <motion.div
            key={match.id}
            initial="hidden"
            animate="visible"
            variants={variants}
          >
            <MatchCard
              match={match}
              route={`/matches/${match.id}`}
            />
          </motion.div>
        )
      })}
    </>
  )
}
