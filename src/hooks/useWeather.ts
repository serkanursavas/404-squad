import { useEffect, useState } from 'react'

import matchService from '../services/matchService'

interface Weather {
  description: string
}

export default function useWeather({ matchDate, nextMatchWeather, matchId }: { matchDate: string; nextMatchWeather: string; matchId: number }) {
  const [weather, setWeather] = useState<Weather | null>(null)
  const [loading, setLoading] = useState<Boolean | null>(null)
  const [error, setError] = useState<String | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=adana&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Error fetching weather data')
        }

        const weatherData = data.list.find((item: any) => {
          const [date, time] = item.dt_txt.split(' ')
          return date === matchDate && time === '18:00:00'
        })

        setWeather({
          description: weatherData.weather[0].description
        })

        // Maç zamanı kontrolü
        const matchDateTime = new Date(`${matchDate}T18:00:00`).getTime()
        const currentTime = Date.now()
        const timeDifferenceInHours = (matchDateTime - currentTime) / (1000 * 60 * 60)

        if (timeDifferenceInHours <= 3) {
          matchService.updateWeather(matchId, weatherData.weather[0].description)
        }
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (nextMatchWeather === null || nextMatchWeather === '' || nextMatchWeather.trim() === '') {
      fetchWeather()
    }
  }, [matchDate])

  return { weather, loading, error }
}
