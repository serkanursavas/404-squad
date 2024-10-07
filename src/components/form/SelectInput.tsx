import { ErrorMessage, Field, FieldProps } from 'formik'
import Select from 'react-select'

interface OptionType {
  value: string
  label: string
}

interface SelectInputProps {
  name: string
  options: OptionType[]
  placeholder: string
  label: string
  error?: string | false
  setFieldValue: (field: string, value: any) => void
}

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderColor: state.isFocused ? '#04764E' : '#dcdcdc', // Focus durumunda özel renk
    boxShadow: state.isFocused ? '0 0 0 1px #04764E' : 'none',
    '&:hover': {
      borderColor: '#04764E' // Hover durumunda özel renk
    }
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#04764E' : 'white',
    color: state.isFocused ? 'white' : 'black',
    '&:hover': {
      backgroundColor: '#04764E',
      color: 'white'
    }
  })
}

export default function SelectInput({ name, options, placeholder, label, error, setFieldValue }: SelectInputProps) {
  return (
    <div>
      <label
        className="text-xs text-neutral-dark"
        htmlFor={name}
      >
        {label}
      </label>
      <Field name={name}>
        {({ field }: FieldProps) => (
          <Select
            id={field.name}
            styles={customStyles}
            options={options}
            placeholder={placeholder}
            value={options.find(option => option.value === field.value)}
            onChange={option => setFieldValue(name, (option as OptionType).value)} // onChange eklendi
            className="block w-full mt-1 text-xs focus:border-primary focus:outline-primary hover:border-primary"
          />
        )}
      </Field>
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
