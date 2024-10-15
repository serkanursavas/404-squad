import { useState } from 'react'
import { ErrorMessage, Field, FieldProps } from 'formik'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

interface InputProps {
  label: string
  name: string
  type: string
  error?: boolean | string
  min?: number
  className?: string
  disabled?: boolean
}

export default function Input({ label, name, type = 'text', error, min, className, disabled }: InputProps) {
  const [showPassword, setShowPassword] = useState(false)

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className={`relative mb-2 space-y-2 ${className}`}>
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
            className={`w-full p-2 border-b-2 focus:outline-none  focus:border-primary focus:border-b-[3px] ${
              error ? 'border-red-500' : 'border-gray-300'
            } 
            ${disabled && 'bg-white'}
              `}
            type={showPassword && type === 'password' ? 'text' : type}
            min={type === 'date' ? today : min}
            disabled={disabled}
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
          className="mt-1 text-xs italic text-primary-error"
        />
      )}
    </div>
  )
}
