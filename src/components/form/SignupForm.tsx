import { Formik, Form } from 'formik'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { signupInitialValues } from '../../forms/signupInitialValues'
import { signupValidationSchema } from '../../validators/signupValidation'
import SelectInput from './SelectInput'
import { SignupFormValues } from '../../types/FormTypes'
import { footOptions, positionOptions } from '../../utils/select-options'

const inputMappings = [
  { label: 'Username', name: 'username', type: 'text' },
  { label: 'Password', name: 'password', type: 'password' },
  { label: 'Password Again', name: 'passwordAgain', type: 'password' },
  { label: 'Name', name: 'name', type: 'text' },
  { label: 'Surname', name: 'surname', type: 'text' }
]

interface SignupFormProps {
  handleSubmit: (values: SignupFormValues) => void
}

export default function SignupForm({ handleSubmit }: SignupFormProps) {
  return (
    <Formik
      initialValues={signupInitialValues}
      validationSchema={signupValidationSchema}
      validateOnBlur={true}
      validateOnChange={true}
      onSubmit={values => {
        // Tüm string değerleri trimle
        const trimmedValues = Object.keys(values).reduce((acc, key) => {
          acc[key as keyof SignupFormValues] =
            typeof values[key as keyof SignupFormValues] === 'string'
              ? (values[key as keyof SignupFormValues] as string).trim()
              : values[key as keyof SignupFormValues]
          return acc
        }, {} as SignupFormValues)

        handleSubmit(trimmedValues)
      }}
    >
      {({ errors, touched, setFieldValue, isSubmitting }) => (
        <Form className="flex flex-col space-y-8">
          {inputMappings.map((input, index) => (
            <Input
              key={index}
              label={input.label}
              name={input.name}
              type={input.type}
              error={
                touched[input.name as keyof SignupFormValues] && errors[input.name as keyof SignupFormValues]
                  ? errors[input.name as keyof SignupFormValues]
                  : false
              }
            />
          ))}

          <SelectInput
            label="Position"
            name="position"
            options={positionOptions}
            placeholder="Select Position"
            setFieldValue={setFieldValue}
            error={touched.position && errors.position ? errors.position : false}
          />

          <SelectInput
            label="Foot"
            name="foot"
            options={footOptions}
            placeholder="Select Foot"
            setFieldValue={setFieldValue}
            error={touched.foot && errors.foot ? errors.foot : false}
          />

          <Button
            label={isSubmitting ? 'Creating...' : 'Create'} // Butonun label'ini değiştiriyoruz
            className="mx-1 text-black bg-secondary"
            shadowColor="rgba(255,255,255, 0.2)"
            disabled={isSubmitting} // isSubmitting true olduğunda buton pasif hale gelir
          />
        </Form>
      )}
    </Formik>
  )
}
