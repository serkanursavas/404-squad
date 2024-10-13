import * as Yup from 'yup'

export const addGoalValidator = Yup.object().shape({
  playerId: Yup.string().required('Player is required'),
  goalCount: Yup.number().min(1, 'Min 1').required('Required').max(10, 'Max 10')
})
