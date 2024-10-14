import InfoItem from './InfoItem'

import dateIcon from '../../assets/icons/calendar.svg'
import clockIcon from '../../assets/icons/clock.svg'
import locationIcon from '../../assets/icons/bookmarks.svg'
import { getFormattedDayAndMonth } from '../../utils/Date/dateUtils'

interface MatchInfoProps {
  date: string
  time: string
  location: string
}

export default function MatchInfo({ date, time, location }: MatchInfoProps) {
  const day = getFormattedDayAndMonth(date)

  return (
    <div className="space-y-2">
      <InfoItem
        icon={dateIcon}
        text={day}
      />
      <InfoItem
        icon={clockIcon}
        text={time}
      />
      <InfoItem
        icon={locationIcon}
        text={location}
      />
    </div>
  )
}
