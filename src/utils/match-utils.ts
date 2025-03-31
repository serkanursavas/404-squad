import { CreateMatchRequest, Match, Roster, UpdateMatchRequest, UpdateMatchRoster } from '../services/matchService'
import { Player } from '../services/playerService'
import { MatchFormData, SelectOption } from '../types/FormTypes'

export const convertMatchToFormData = (match: Match): MatchFormData => {
  const [matchDate, matchTime] = match.dateTime.split('T')

  const whiteTeam = match.rosters?.filter(roster => roster.teamColor.toUpperCase() === 'WHITE').map(roster => roster.playerId.toString()) || []
  const blackTeam = match.rosters?.filter(roster => roster.teamColor.toUpperCase() === 'BLACK').map(roster => roster.playerId.toString()) || []

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

export const convertFormDataToMatchRequest = (formData: MatchFormData): CreateMatchRequest | UpdateMatchRequest => {
  const { matchDate, matchTime, location, teamSize, whiteTeam, blackTeam, id } = formData

  // Tarih ve saat birleştiriliyor
  const dateTime = `${matchDate}T${matchTime}`

  const rosters: UpdateMatchRoster[] = [
    ...whiteTeam.map(player => {
      if (typeof player === 'string') {
        // Eğer sadece playerId varsa (create işlemi için)
        return {
          teamColor: 'WHITE',
          playerId: Number(player) // Player ID'yi sayıya dönüştür
        }
      } else {
        // Eğer player nesne ise (update işlemi için rosterId ve playerId mevcut)
        return {
          id: player.rosterId, // rosterId her zaman var, doğrudan ekliyoruz
          teamColor: 'WHITE',
          playerId: Number(player.playerId) // Player ID'yi sayıya dönüştür
        }
      }
    }),
    ...blackTeam.map(player => {
      if (typeof player === 'string') {
        // Eğer sadece playerId varsa (create işlemi için)
        return {
          teamColor: 'BLACK',
          playerId: Number(player) // Player ID'yi sayıya dönüştür
        }
      } else {
        // Eğer player nesne ise (update işlemi için rosterId ve playerId mevcut)
        return {
          id: player.rosterId, // rosterId her zaman var, doğrudan ekliyoruz
          teamColor: 'BLACK',
          playerId: Number(player.playerId) // Player ID'yi sayıya dönüştür
        }
      }
    })
  ]

  // Eğer id varsa UpdateMatchRequest, yoksa CreateMatchRequest döndürülüyor
  if (id) {
    return {
      id: id,
      location,
      weather: '',
      dateTime,
      teamSize,
      rosters
    } as UpdateMatchRequest
  }

  return {
    location,
    weather: '',
    dateTime,
    teamSize,
    rosters
  } as CreateMatchRequest
}

export function activePlayersToSelectOptions(players: Player[]): SelectOption[] {
  return players
    .filter(player => player.active)
    .map(player => ({
      value: player.id.toString(),
      label: `${player.name} ${player.surname}`
    }))
}

export const createUpdatedMatchRequest = (values: MatchFormData, rosters: Roster[]): UpdateMatchRequest => {
  const whiteRosters = rosters.filter(r => r.teamColor === 'WHITE')
  const blackRosters = rosters.filter(r => r.teamColor === 'BLACK')

  const updatedRosters = [
    ...values.whiteTeam.map((playerId, index) => {
      const originalRoster = whiteRosters[index]

      return {
        playerId: Number(playerId),
        teamColor: 'WHITE',
        id: originalRoster ? originalRoster.id : undefined
      }
    }),
    ...values.blackTeam.map((playerId, index) => {
      const originalRoster = blackRosters[index]

      return {
        playerId: Number(playerId),
        teamColor: 'BLACK',
        id: originalRoster ? originalRoster.id : undefined
      }
    })
  ]

  return {
    id: values.id!,
    location: values.location,
    weather: '',
    dateTime: `${values.matchDate}T${values.matchTime}`,
    teamSize: values.teamSize,
    rosters: updatedRosters
  }
}
