import { useNavigate } from 'react-router-dom'
import { Player } from '../../../types/MatchTypes'
import Button from '../../ui/Button'

interface VoteFormProps {
  squad: Player[]
}

export default function VoteForm({ squad }: VoteFormProps) {
  const navigate = useNavigate()

  return (
    <form className="relative space-y-3">
      {squad?.map(player => {
        return (
          <div
            key={player.id}
            className={`flex justify-between items-center space-y-1 border-b border-gray-300 p-2`}
          >
            <span onClick={() => navigate(`/profile/${player.id}`)}>{player.name}</span>

            <select
              name="rating"
              className="p-2 border-2 outline-none bg-neutral border-secondary shadow-pixel"
            >
              {[...Array(10)].map((_, index) => (
                <option
                  key={index + 1}
                  value={index + 1}
                >
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
        )
      })}
      <div className="py-2 text-right">
        <Button
          label="Vote"
          color="bg-primary text-white"
        />
      </div>
    </form>
  )
}
