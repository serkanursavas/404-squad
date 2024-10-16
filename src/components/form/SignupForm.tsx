import { Formik, Form } from 'formik'

import Button from '../ui/Button'
import Input from '../ui/Input'
import { signupInitialValues } from '../../forms/signupInitialValues'
import { signupValidationSchema } from '../../validators/signupValidation'
import SelectInput from './SelectInput'
import { SignupFormValues } from '../../types/FormTypes'

const positionOptions = [
  { value: 'goalkeeper', label: 'Goalkeeper' },
  { value: 'defender', label: 'Defender' },
  { value: 'midfielder', label: 'Midfielder' },
  { value: 'forward', label: 'Forward' }
]

const footOptions = [
  { value: 'left', label: 'Left' },
  { value: 'right', label: 'Right' },
  { value: 'both', label: 'Both' }
]

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
        handleSubmit(values)
      }}
    >
      {({ errors, touched, setFieldValue }) => (
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
            label="Create"
            className="mx-1 text-black bg-secondary"
            shadowColor="rgba(255,255,255, 0.2)"
          />
        </Form>
      )}
    </Formik>
  )
}
