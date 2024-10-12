import * as Yup from 'yup'

export const manageMatchValidationSchema = Yup.object().shape({
  location: Yup.string().required('Match place is required'),
  matchDate: Yup.date()
    .transform(function (value, originalValue) {
      return originalValue ? new Date(originalValue) : value
    })
    .min(new Date().setHours(0, 0, 0, 0), 'Past dates cannot be selected.')
    .required('Date is required'),
  matchTime: Yup.string()
    .test('is-future-time', 'Past times cannot be selected.', function (value) {
      const { matchDate } = this.parent
      const now = new Date()
      const selectedDate = new Date(matchDate)

      if (selectedDate.toDateString() === now.toDateString()) {
        return value && value > now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) ? true : false
      }
      return true
    })
    .required('Saat gerekli'),
  teamSize: Yup.number().min(6, 'Team size must be at least 6').max(11, 'Team size can be at most 11').required('Team size is required'),
  whiteTeam: Yup.array()
    .of(Yup.string())
    .min(Yup.ref('teamSize'), 'The number of selected players must be exactly the same as the team size')
    .max(Yup.ref('teamSize'), 'The number of selected players must be exactly the same as the team size'),
  blackTeam: Yup.array()
    .of(Yup.string())
    .min(Yup.ref('teamSize'), 'The number of selected players must be exactly the same as the team size')
    .max(Yup.ref('teamSize'), 'The number of selected players must be exactly the same as the team size')
})
