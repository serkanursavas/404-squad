import InfoItem from './InfoItem'

import dateIcon from '../../assets/icons/calendar.svg'
import clockIcon from '../../assets/icons/clock.svg'
import locationIcon from '../../assets/icons/bookmarks.svg'

interface MatchInfoProps {
  date: string
  time: string
  location: string
}

export default function MatchInfo({ date, time, location }: MatchInfoProps) {
  return (
    <>
      <InfoItem
        icon={dateIcon}
        text={date}
      />
      <InfoItem
        icon={clockIcon}
        text={time}
      />
      <InfoItem
        icon={locationIcon}
        text={location}
      />
    </>
  )
}
