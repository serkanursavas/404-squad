import React from 'react'

interface GameLocationInfoProps {
  latitude: number
  longitude: number
  location: string
}

const GameLocationInfo: React.FC<GameLocationInfoProps> = ({ latitude, longitude, location }) => {
  const handleLocationClick = () => {
    // Google Maps URL ile yönlendirme
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`
    window.open(url, '_blank') // Yeni pencerede açar (mobil cihazlarda Google Maps açılacaktır)
  }

  return (
    <div className="ml-1">
      <h3
        onClick={handleLocationClick}
        style={{ cursor: 'pointer' }}
      >
        {location}
      </h3>
    </div>
  )
}

export default GameLocationInfo
