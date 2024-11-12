import { Formik, Form } from 'formik'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { accountValidationSchema } from '../validators/accountSettingsValidator'
import useUser from '../hooks/useUsers'
import useAuth from '../hooks/useAuth'

export default function AccountSettings() {
  const { updateProfile } = useUser()
  const { user } = useAuth()

  const handleSubmit = (values: { username?: string; password?: string; passwordAgain?: string }) => {
    const updateData: { username?: string; password?: string; passwordAgain?: string } = {}

    if (values.username && values.username !== user?.username) {
      updateData.username = values.username
    }

    if (values.password && values.passwordAgain) {
      updateData.password = values.password
      updateData.passwordAgain = values.passwordAgain
    }

    if (user && Object.keys(updateData).length > 0) {
      updateProfile({ username: user.username, updateData })
    } else {
      console.log('Güncellenecek bir veri yok.')
    }
  }

  return (
    <div className="flex items-center justify-center px-8 xs:py-12">
      <div className="flex flex-col justify-around space-y-6">
        <div>
          <div className="text-3xl text-center text-primary xs:mb-16 xs:text-4xl">Account Settings</div>
          <p className="mb-20 text-center text-gray-600">Change your username or password or both</p>
          <Formik
            initialValues={{
              username: '',
              password: '',
              passwordAgain: ''
            }}
            validationSchema={accountValidationSchema}
            validateOnBlur={true}
            validateOnChange={true}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values }) => (
              <Form className="flex flex-col space-y-8">
                <Input
                  label="Username"
                  name="username"
                  type="text"
                  error={errors.username && touched.username ? errors.username : ''}
                />

                <Input
                  label="Password"
                  name="password"
                  type="password"
                  error={errors.password && touched.password ? errors.password : ''}
                />

                <Input
                  label="Password Again"
                  name="passwordAgain"
                  type="password"
                  error={errors.passwordAgain && touched.passwordAgain ? errors.passwordAgain : ''}
                />

                <Button
                  label="Update"
                  type="submit"
                  className="mx-1 mt-2 text-black bg-secondary"
                  shadowColor="rgba(255,255,255, 0.2)"
                  disabled={!values.username && !values.password && !values.passwordAgain}
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
