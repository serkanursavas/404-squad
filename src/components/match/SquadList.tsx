import { useNavigate } from 'react-router-dom'

import { Player } from '../../types/MatchTypes'
import Button from '../ui/Button'
import { useState } from 'react'

interface SquadListProps {
  teamLogo: string
  squad: Player[]
}

export default function SquadList({ teamLogo, squad }: SquadListProps) {
  const navigate = useNavigate()

  const [rating, setRating] = useState<{ id: number; value: string }[]>([])

  return (
    <div>
      <div className="flex justify-between mb-3 text-neutral-dark border-b border-black text-[10px]">
        <span>Player</span>
        <span>Form</span>
      </div>

      <div className="relative">
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-20"
          style={{
            backgroundImage: `url(${teamLogo})`
          }}
        ></div>

        <form
          onSubmit={e => {
            e.preventDefault()

            console.log(rating)
          }}
        >
          <div className="relative">
            {squad?.map(player => {
              return (
                <div
                  key={player.id}
                  className={`flex justify-between space-y-1 border-b border-gray-300 pt-1`}
                >
                  <span onClick={() => navigate(`/profile/${player.id}`)}>{player.name}</span>

                  <span>{player.form}</span>
                  <select
                    id="fruits"
                    name="fruits"
                    onChange={e =>
                      setRating(prev => {
                        const newRating = { id: player.id, value: e.target.value }
                        return [...prev.filter(r => r.id !== player.id), newRating] // Aynı oyuncunun eski rating'ini güncelliyoruz
                      })
                    }
                  >
                    <option value="apple">Apple</option>
                    <option value="banana">Banana</option>
                    <option value="cherry">Cherry</option>
                    <option value="date">Date</option>
                    <option value="grape">Grape</option>
                  </select>
                </div>
              )
            })}
          </div>
          <Button
            label="Oyla"
            color="bg-purple-400"
          />
        </form>
      </div>
    </div>
  )
}
