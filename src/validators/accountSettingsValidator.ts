import * as Yup from 'yup'

export const accountValidationSchema = Yup.object()
  .shape({
    username: Yup.string().min(3, 'Username must be at least 3 characters long'),
    password: Yup.string()
      .min(6, 'Min 6, upper, lower, number')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/, 'Min 6, upper, lower, number'),
    passwordAgain: Yup.string().oneOf([Yup.ref('password'), undefined], 'Passwords must match')
  })
  .test('at-least-one', 'You must provide either username or password', function (value) {
    return !!value.username || !!value.password
  })
