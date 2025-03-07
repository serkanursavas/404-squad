import * as Yup from 'yup'

export const signupValidationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required').min(3, 'Username must be at least 3 characters long'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Min 6, upper, lower, number')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/, 'Min 6, upper, lower, number'),
  passwordAgain: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match') // passwordAgain'in, password ile eşleştiğinden emin ol
    .required('Please confirm your password'),
  name: Yup.string().required('Name is required'),
  surname: Yup.string().required('Surname is required'),
  position: Yup.string().required('Position selection is required'),
  foot: Yup.string().required('Preferred foot selection is required')
})
