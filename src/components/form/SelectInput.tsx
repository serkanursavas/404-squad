import { ErrorMessage, Field, FieldProps } from 'formik'
import { useState } from 'react'
import Select from 'react-select'
import { SelectOption } from '../../types/FormTypes'

interface SelectInputProps {
  name: string
  options: SelectOption[]
  placeholder: string
  label?: string
  error?: string | false
  setFieldValue: (field: string, value: any) => void
  teamSize?: number
  isMultiSelect?: boolean
  value?: SelectOption | SelectOption[] | null
  className?: string
  borderColor?: string
  focusColor?: string
  hoverColor?: string
  multiValueColor?: string
  onMenuOpen?: () => void // Menü açıldığında tetiklenecek fonksiyon
  onMenuClose?: () => void // Menü kapandığında tetiklenecek fonksiyon
}

const getCustomStyles = ({
  borderColor = '#dcdcdc',
  focusColor = '#04764E',
  hoverColor = '#04764E',
  multiValueColor = '#04764E'
}: {
  borderColor?: string
  focusColor?: string
  hoverColor?: string
  multiValueColor?: string
}) => ({
  control: (provided: any, state: any) => ({
    ...provided,
    borderColor: state.isFocused ? focusColor : borderColor,
    boxShadow: state.isFocused ? `0 0 0 1px ${focusColor}` : 'none',
    borderRadius: '0',
    '&:hover': {
      borderColor: hoverColor
    }
  }),
  menu: (provided: any) => ({
    ...provided,
    borderRadius: '0'
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? hoverColor : 'white',
    color: state.isFocused ? 'white' : 'black',
    '&:hover': {
      backgroundColor: hoverColor,
      color: 'white'
    }
  }),
  multiValue: (provided: any) => ({
    ...provided,
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: '0'
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: '#fff',
    backgroundColor: multiValueColor,
    padding: '10px',
    width: '100%',
    borderRadius: '0'
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: multiValueColor,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: multiValueColor,
      color: 'white'
    }
  })
})

export default function SelectInput({
  name,
  options,
  placeholder,
  label,
  error,
  setFieldValue,
  teamSize = 6,
  isMultiSelect = false,
  value,
  className,
  borderColor,
  focusColor,
  hoverColor,
  multiValueColor,
  onMenuOpen, // Menü açıldığında çalıştırılacak fonksiyon
  onMenuClose // Menü kapandığında çalıştırılacak fonksiyon
}: SelectInputProps) {
  const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([])

  const handleSelectChange = (selectedOption: SelectOption | SelectOption[] | null) => {
    if (isMultiSelect) {
      const multiSelectOptions = selectedOption as SelectOption[]
      if (multiSelectOptions.length <= teamSize) {
        setSelectedOptions(multiSelectOptions)
        setFieldValue(
          name,
          multiSelectOptions.map(option => option.value)
        )
      }
    } else {
      const singleSelectOption = selectedOption as SelectOption
      setSelectedOptions(singleSelectOption ? [singleSelectOption] : [])
      setFieldValue(name, singleSelectOption ? singleSelectOption.value : null)
    }
  }

  const customStyles = getCustomStyles({ borderColor, focusColor, hoverColor, multiValueColor })

  return (
    <div>
      <label
        className="text-xs text-neutral-dark"
        htmlFor={name}
      >
        {label}
      </label>
      <Field name={name}>
        {({ field, form }: FieldProps) => {
          const selectedValues = form.values[name]

          // Seçili değerleri react-select için uygun formata dönüştür
          const formattedValue = isMultiSelect
            ? options.filter(option => selectedValues.includes(option.value))
            : options.find(option => option.value === selectedValues)

          return (
            <Select
              id={field.name}
              styles={customStyles}
              options={options.filter(option => !selectedOptions.some(selected => selected.value === option.value))}
              placeholder={placeholder}
              value={value || formattedValue}
              onChange={options => handleSelectChange(options as SelectOption[])}
              className={`block w-full mt-1 text-xs focus:border-primary focus:outline-primary hover:border-primary ${className}`}
              isMulti={isMultiSelect}
              onMenuOpen={onMenuOpen} // Menü açıldığında tetiklenecek fonksiyon
              onMenuClose={onMenuClose} // Menü kapandığında tetiklenecek fonksiyon
            />
          )
        }}
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
