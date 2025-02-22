import { useMutation, useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { RootState } from '../store'
import { fetchPersonaSuccess, Persona } from '../store/personaSlice'
import personaService, { PersonasData } from '../services/personaService'
import { CustomError } from './useAuth'

const usePersona = () => {
  const dispatch = useDispatch()

  // Redux'tan oyuncu verilerini alıyoruz
  const persona = useSelector((state: RootState) => state.persona.personas)

  const { data, isLoading, isError, error } = useQuery<Persona[], Error>({
    queryKey: ['persona'],
    queryFn: personaService.getAllPersona,
    staleTime: 1000 * 60 * 1, // 5 dakika boyunca veri taze kabul edilir
    refetchInterval: persona.length > 0 ? 1000 * 60 * 1 : false // Eğer Redux'ta veri varsa 5 dakikada bir refetch yapılır
  })

  useEffect(() => {
    if (data) {
      dispatch(fetchPersonaSuccess({ personas: data }))
    }
  }, [data, dispatch])

  const { mutate: savePersonas } = useMutation<{ personasData: PersonasData[] }, CustomError, PersonasData[]>({
    mutationFn: async (personasData: PersonasData[]) => {
      return personaService.savePersonas(personasData)
    }
  })

  const handleSavePersonas = (personasData: PersonasData[]) => {
    savePersonas(personasData)
  }

  return { persona: persona.length > 0 ? persona : data, isLoading, isError, error, handleSavePersonas }
}

export default usePersona
