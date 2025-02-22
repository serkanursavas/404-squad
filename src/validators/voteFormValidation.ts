import * as Yup from 'yup'

export const VoteFormSchema = () =>
  Yup.object().shape({
    ratings: Yup.array().of(
      Yup.object().shape({
        playerId: Yup.number().required(),
        rate: Yup.number()
          .required('!') // Boş bırakılmasını engelle
          .min(1, '!') // Minimum değer kontrolü
          .max(10, '!') // Maksimum değer kontrolü
      })
    )
  })
