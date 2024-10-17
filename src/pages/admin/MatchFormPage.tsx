import { Formik, Form } from 'formik'
import Input from '../../components/ui/Input'
import SelectInput from '../../components/form/SelectInput'
import Button from '../../components/ui/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { manageMatchValidationSchema } from '../../validators/manageMatchValidation'
import { initialValues as defaultInitialValues } from '../../forms/matchInitialValues'
import { MatchFormData, SelectOption } from '../../types/FormTypes'
import { useEffect, useState } from 'react'
import useMatches from '../../hooks/useMatches'
import { CreateMatchRequest, Match } from '../../services/matchService'

const players: SelectOption[] = [
  { value: '1', label: 'Player 1' },
  { value: '2', label: 'Player 2' },
  { value: '3', label: 'Player 3' },
  { value: '4', label: 'Player 4' },
  { value: '5', label: 'Player 5' },
  { value: '6', label: 'Player 6' },
  { value: '7', label: 'Player 7' },
  { value: '8', label: 'Player 8' },
  { value: '9', label: 'Player 9' },
  { value: '10', label: 'Player 10' },
  { value: '11', label: 'Player 11' },
  { value: '12', label: 'Player 12' }
]

const convertMatchToFormData = (match: Match): MatchFormData => {
  const [matchDate, matchTime] = match.dateTime.split('T')

  const whiteTeam = match.rosters?.filter(roster => roster.teamColor.toLowerCase() === 'white').map(roster => roster.playerId.toString()) || []
  const blackTeam = match.rosters?.filter(roster => roster.teamColor.toLowerCase() === 'black').map(roster => roster.playerId.toString()) || []

  return {
    id: match.id,
    location: match.location,
    matchDate: matchDate,
    matchTime: matchTime.split('.')[0], // Milisaniyeleri atıyoruz
    // teamSize: match.rosters ? match.rosters.length / 2 : 6, // Rosters varsa, yoksa default olarak 6
    teamSize: 8, // Rosters varsa, yoksa default olarak 6
    whiteTeam: whiteTeam, // Beyaz takım oyuncuları
    blackTeam: blackTeam, // Siyah takım oyuncuları
    isPlayed: match.played
  }
}

const convertFormDataToCreateMatchRequest = (formData: MatchFormData): CreateMatchRequest => {
  const { matchDate, matchTime, location, teamSize, whiteTeam, blackTeam } = formData

  // Tarih ve saat birleştiriliyor
  const dateTime = `${matchDate}T${matchTime}`

  // Roster verisi oluşturuluyor (beyaz ve siyah takım oyuncuları birleştiriliyor)
  const rosters = [
    ...whiteTeam.map(playerId => ({
      teamColor: 'white',
      playerId: Number(playerId) // String ID'yi sayıya dönüştür
    })),
    ...blackTeam.map(playerId => ({
      teamColor: 'black',
      playerId: Number(playerId) // String ID'yi sayıya dönüştür
    }))
  ]

  // `CreateMatchRequest` nesnesi döndürülüyor
  return {
    location,
    weather: '', // Eğer formdan alınan hava durumu yoksa boş bırakıyoruz (bu isteğe göre eklenebilir)
    dateTime,
    teamSize,
    rosters
  }
}

export default function MatchFormPage() {
  const [initialValues, setInitialValues] = useState<MatchFormData>(defaultInitialValues)
  const navigate = useNavigate()
  const { id } = useParams()
  const { useMatchDetails, createMatch } = useMatches()
  const [loading, setLoading] = useState(true)

  // 'id' varsa, maçın detaylarını getiriyoruz
  const match = useMatchDetails(Number(id))

  const isEditMode = Boolean(id)

  useEffect(() => {
    if (isEditMode && match) {
      const formattedMatch = convertMatchToFormData(match)
      console.log('Formatted match ', JSON.stringify(formattedMatch, null, 2))

      // Eğer initialValues güncellenmemişse setInitialValues çağırılır
      if (JSON.stringify(initialValues) !== JSON.stringify(formattedMatch)) {
        setInitialValues(formattedMatch) // Tüm initialValues güncellenir
        console.log('Updated initialValues with match data')
      }
    } else if (!isEditMode) {
      // Yeni maç oluşturuluyorsa default initialValues'u kullan
      setInitialValues(defaultInitialValues)
    }

    // Loading'in doğru şekilde kapatılması
    setLoading(false)
  }, [isEditMode, match]) // `match` ve `isEditMode` değiştiğinde yeniden çalışır

  const handleSubmit = (values: MatchFormData) => {
    if (isEditMode) {
      console.log('Match Updated', values)
    } else {
      console.log('New Match Created', values)
      // const createMatchData = convertFormDataToCreateMatchRequest(values)
      // createMatch(createMatchData)
    }
    navigate('/admin/matches')
  }

  // Loading durumu
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="">
      <Formik
        key={JSON.stringify(initialValues)}
        initialValues={initialValues}
        validationSchema={manageMatchValidationSchema}
        validateOnBlur={true}
        validateOnChange={true}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ touched, errors, setFieldValue, values }) => {
          const filteredPlayersForWhiteTeam = players.filter(player => !values.blackTeam.includes(player.value))

          const filteredPlayersForBlackTeam = players.filter(player => !values.whiteTeam.includes(player.value))

          return (
            <Form className="flex flex-col justify-center p-5 space-y-8">
              <Input
                label="Match Place"
                name="location"
                type="text"
                min={1}
                error={touched.location && errors.location ? errors.location : false}
              />
              <Input
                label="Match Date"
                name="matchDate"
                type="date"
                min={1}
                error={touched.matchDate && errors.matchDate ? errors.matchDate : false}
              />
              <Input
                label="Match Time"
                name="matchTime"
                type="time"
                min={1}
                error={touched.matchTime && errors.matchTime ? errors.matchTime : false}
              />
              <Input
                label="Team Size"
                name="teamSize"
                type="number"
                min={1}
                error={touched.teamSize && errors.teamSize ? errors.teamSize : false}
              />

              <SelectInput
                label="Select Player for White Team"
                name="whiteTeam"
                options={filteredPlayersForWhiteTeam}
                placeholder="Select a player"
                setFieldValue={(field: string, value: any) => setFieldValue(field, value)}
                error={touched.whiteTeam && typeof errors.whiteTeam === 'string' ? errors.whiteTeam : false}
                teamSize={values.teamSize}
                isMultiSelect
              />

              <SelectInput
                label="Select Player for Black Team"
                name="blackTeam"
                options={filteredPlayersForBlackTeam}
                placeholder="Select a player"
                setFieldValue={(field: string, value: any) => setFieldValue(field, value)}
                error={touched.blackTeam && typeof errors.blackTeam === 'string' ? errors.blackTeam : false}
                teamSize={values.teamSize}
                isMultiSelect
              />

              <Button
                label="Submit"
                type="submit"
              />
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}
