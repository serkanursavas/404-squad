import Banner from '../components/match/Banner'

const dummyMatch = {
  date: 'Monday',
  time: '18:00',
  location: 'Adana'
}

export default function Home() {
  return (
    <div>
      <Banner match={dummyMatch} />
    </div>
  )
}
