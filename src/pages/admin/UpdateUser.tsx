import Button from '../../components/ui/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
import { userUpdateValidationSchema } from '../../validators/userUpdateValidation'
import { Form, Formik } from 'formik'
import Input from '../../components/ui/Input'
import SelectInput from '../../components/form/SelectInput'
import { SelectOption } from '../../types/FormTypes'
import { showConfirmationModal } from '../../utils/showConfirmationModal'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { User } from '../../services/userService'
import useUser from '../../hooks/useUsers'
import { toast } from 'react-toastify'

const roles: SelectOption[] = [
  { value: 'USER', label: 'USER' },
  { value: 'ADMIN', label: 'ADMIN' }
]

export default function UpdateUser() {
  const { id } = useParams()
  const [user, setUser] = useState<User | null>(null)

  const { updateUserRole, resetPassword } = useUser()

  const usersState = useSelector((state: RootState) => state.users)

  const handleResetPassword = () => {
    showConfirmationModal(
      {
        title: 'Are you sure?',
        text: 'Do you want to reset users password?',
        icon: 'warning',
        confirmButtonText: 'Yes'
      },
      () => {
        if (user?.username) {
          resetPassword(user.username)
        } else {
          toast.error('Username is undefined, cannot reset password.')
        }
      }
    )
  }

  const userToUpdate = useMemo(() => {
    if (id) {
      const userId = parseInt(id)
      return usersState.users.find((user: User) => user.id === userId)
    }
    return null
  }, [id, usersState])

  useEffect(() => {
    if (userToUpdate) {
      setUser(userToUpdate)
    }
  }, [userToUpdate])

  const handleSubmit = async (values: User) => {
    const updatedFields = Object.keys(values).reduce((acc, key) => {
      if (user && values[key as keyof User] !== user[key as keyof User]) {
        acc[key as keyof User] = values[key as keyof User] as any
      }
      return acc
    }, {} as Partial<User>)

    if (Object.keys(updatedFields).length > 0) {
      updateUserRole({ username: values.username, updatedRole: values.role })
    } else {
      toast.info('No changes detected!')
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="mx-auto bg-white md:w-6/12">
      <Formik
        initialValues={user}
        onSubmit={handleSubmit}
        enableReinitialize
        validationSchema={userUpdateValidationSchema}
      >
        {({ touched, errors, setFieldValue }) => {
          return (
            <Form className="p-8">
              <h1 className="text-2xl text-center text-primary">Update User</h1>
              <div className="flex flex-col pt-4 space-y-10">
                <Input
                  label="Username"
                  name="username"
                  type="text"
                  disabled
                />

                <SelectInput
                  label="Role"
                  name="role"
                  options={roles}
                  placeholder="Select role"
                  setFieldValue={(field, value) => setFieldValue(field, value)}
                  error={touched.role && errors.role ? errors.role : false}
                />

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    label={'Update'}
                  />
                  <Button
                    type="button"
                    label="Reset Password"
                    onClick={handleResetPassword}
                  />
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}
