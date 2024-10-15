import { useEffect, useState } from 'react'

interface Weather {
  description: string
  temperature: number
  icon: string
}

export default function useWeather(matchDate: string) {
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
          return date === matchDate && time === '12:00:00'
        })

        setWeather({
          description: weatherData.weather[0].description,
          temperature: weatherData.main.temp,
          icon: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`
        })
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [matchDate])

  return { weather, loading, error }
}
