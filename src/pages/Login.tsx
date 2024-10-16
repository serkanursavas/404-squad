import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Button from '../components/ui/Button'
import logo from '../assets/images/logos/logo.png'
import Input from '../components/ui/Input'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function Login() {
  const { login, isLoading } = useAuth()

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required').min(3, 'Username must be at least 3 characters long'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long')
  })

  return (
    <div className="flex items-center justify-center h-screen px-8 py-4 bg-white xs:py-12">
      <div className="flex flex-col justify-around min-h-screen space-y-6">
        <div className="flex items-center justify-center ">
          <img
            className="w-48 xs:w-56"
            src={logo}
            alt="Company Logo"
          />
        </div>
        <div>
          <div className="mb-10 text-3xl text-center xs:mb-16 xs:text-4xl text-primary">Login</div>

          {/* Formik ile formu yönetiyoruz */}
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={values => {
              login(values)
            }}
          >
            {({ errors, touched }) => (
              <Form className="flex flex-col space-y-10">
                <Input
                  type="text"
                  name="username"
                  label="Username"
                  className="text-sm"
                  error={touched.username && errors.username ? errors.username : false}
                />

                <Input
                  type="password"
                  name="password"
                  label="Password"
                  className="text-sm"
                  error={touched.password && errors.password ? errors.password : false}
                />

                <div className="w-full">
                  <Button
                    label={'Login'}
                    className={`w-full mx-1 mt-3 text-white bg-primary ${isLoading && 'animate-ping'}`}
                    shadowColor="rgba(255,255,255, 0.2)"
                    type="submit"
                  />
                </div>
              </Form>
            )}
          </Formik>

          <div className="mt-5 text-[9px] xs:text-[10px] space-x-2 xs:space-x-6 ">
            <span>Don't you have an account?</span>
            <Link
              className="text-purple-400"
              to="/signup"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
