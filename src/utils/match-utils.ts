import { CreateMatchRequest, Match } from '../services/matchService'
import { Player } from '../services/playerService'
import { MatchFormData, SelectOption } from '../types/FormTypes'

export const convertMatchToFormData = (match: Match): MatchFormData => {
  const [matchDate, matchTime] = match.dateTime.split('T')

  const whiteTeam = match.rosters?.filter(roster => roster.teamColor.toLowerCase() === 'white').map(roster => roster.playerId.toString()) || []
  const blackTeam = match.rosters?.filter(roster => roster.teamColor.toLowerCase() === 'black').map(roster => roster.playerId.toString()) || []

  return {
    id: match.id,
    location: match.location,
    matchDate: matchDate,
    matchTime: matchTime.split('.')[0], // Milisaniyeleri atıyoruz
    teamSize: match.rosters ? match.rosters.length / 2 : 6, // Rosters varsa, yoksa default olarak 6
    whiteTeam: whiteTeam, // Beyaz takım oyuncuları
    blackTeam: blackTeam, // Siyah takım oyuncuları
    isPlayed: match.played
  }
}

export const convertFormDataToCreateMatchRequest = (formData: MatchFormData): CreateMatchRequest => {
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

export function activePlayersToSelectOptions(players: Player[]): SelectOption[] {
  return players
    .filter(player => player.active) // Sadece aktif olan oyuncuları filtrele
    .map(player => ({
      value: player.id.toString(), // value'yu id'den al
      label: `${player.name} ${player.surname}` // label için name ve surname birleştir
    }))
}
