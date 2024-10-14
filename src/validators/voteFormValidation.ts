import * as Yup from 'yup'

export const VoteFormSchema = (currentPlayerId: number) =>
  Yup.object().shape({
    ratings: Yup.array().of(
      Yup.object().shape({
        playerId: Yup.number().required(),
        rating: Yup.number()
          .nullable()
          .test('', '!', function (value, context) {
            const { playerId } = context.parent
            if (playerId === currentPlayerId) {
              return true
            }
            return (value ?? 0) >= 1 && (value ?? 0) <= 10
          })
      })
    )
  })
