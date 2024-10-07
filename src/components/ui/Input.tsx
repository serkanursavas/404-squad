import { useState } from 'react'
import { ErrorMessage, Field, FieldProps } from 'formik'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

interface InputProps {
  label: string
  name: string
  type: string
  error?: boolean | string
}

export default function Input({ label, name, type = 'text', error }: InputProps) {
  const [showPassword, setShowPassword] = useState(false)

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  return (
    <div className="relative mb-4">
      <label
        className="text-xs text-neutral-dark"
        htmlFor={name}
      >
        {label}
      </label>
      <Field name={name}>
        {({ field }: FieldProps) => (
          <input
            {...field}
            id={name}
            className={`w-full py-2 border-b-2 focus:outline-none ${
              error ? 'border-red-500' : 'border-gray-300'
            } focus:border-primary focus:border-b-[3px]`}
            type={showPassword && type === 'password' ? 'text' : type}
          />
        )}
      </Field>
      {type === 'password' && (
        <div
          className="absolute cursor-pointer top-9 right-3"
          onClick={handleShowPassword}
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </div>
      )}
      {error && (
        <ErrorMessage
          name={name}
          component="div"
          className="mt-1 text-xs italic text-error"
        />
      )}
    </div>
  )
}
