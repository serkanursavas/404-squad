// utils/weatherUtils.ts

import sunnySvg from '../assets/icons/sun.png'
import rainSvg from '../assets/icons/rain.svg'
import cloudsSvg from '../assets/icons/clouds.png'
import brokenCloudsSvg from '../assets/icons/broken_clouds.png'
import scatteredCloudsSvg from '../assets/icons/scattered_clodus.png'
import showerRainSvg from '../assets/icons/shower_rain.png'
import thunderstormSvg from '../assets/icons/thunderstorm.png'

export function getWeatherIcon(weather: string): string {
  const weatherIcons: { [key: string]: string } = {
    'clear sky': sunnySvg,
    rain: rainSvg,
    'few clouds': cloudsSvg,
    'broken clouds': brokenCloudsSvg,
    'scattered clouds': scatteredCloudsSvg,
    'shower rain': showerRainSvg,
    thunderstorm: thunderstormSvg
  }

  return weatherIcons[weather] || cloudsSvg // Default ikon
}

export function normalizeWeatherString(weather: string): string {
  const weatherMap: { [key: string]: string } = {
    'clear sky': 'Sunny',
    rain: 'Rainy',
    'few clouds': 'Partly Cloudy',
    'broken clouds': 'Mostly Cloudy',
    'scattered clouds': 'Scattered Clouds',
    'shower rain': 'Light Showers',
    thunderstorm: 'Thunderstorms'
  }

  return weatherMap[weather] || weather // Default: Orijinal değeri döner
}
