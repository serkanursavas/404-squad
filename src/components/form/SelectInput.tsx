import { ErrorMessage, Field, FieldProps } from "formik";
import { useState } from "react";
import Select from "react-select";
import { SelectOption } from "../../types/FormTypes";

interface SelectInputProps {
  name: string;
  options: SelectOption[];
  placeholder: string;
  label: string;
  error?: string | false;
  setFieldValue: (field: string, value: any) => void;
  teamSize?: number; // Varsayılan olarak 6 olacak
  isMultiSelect?: boolean;
}

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderColor: state.isFocused ? "#04764E" : "#dcdcdc", // Focus durumunda özel renk
    boxShadow: state.isFocused ? "0 0 0 1px #04764E" : "none",
    "&:hover": {
      borderColor: "#04764E", // Hover durumunda özel renk
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#04764E" : "white",
    color: state.isFocused ? "white" : "black",
    "&:hover": {
      backgroundColor: "#04764E",
      color: "white",
    },
  }),
  multiValue: (provided: any) => ({
    ...provided,
    width: "100%",
    backgroundColor: "#f0f0f0",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "#fff",
    backgroundColor: "#04764E",
    padding: "10px",
    width: "100%",
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: "#04764E",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#04764E",
      color: "white",
    },
  }),
};

export default function SelectInput({
  name,
  options,
  placeholder,
  label,
  error,
  setFieldValue,
  teamSize = 6,
  isMultiSelect = false,
}: SelectInputProps) {
  const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([]);

  const handleSelectChange = (selectedOption: SelectOption | SelectOption[] | null) => {
    if (isMultiSelect) {
      const multiSelectOptions = selectedOption as SelectOption[];
      if (multiSelectOptions.length <= teamSize) {
        setSelectedOptions(multiSelectOptions);
        setFieldValue(
          name,
          multiSelectOptions.map((option) => option.value)
        );
      }
    } else {
      const singleSelectOption = selectedOption as SelectOption;
      setSelectedOptions(singleSelectOption ? [singleSelectOption] : []);
      setFieldValue(name, singleSelectOption ? singleSelectOption.value : null);
    }
  };

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
          const selectedValues = form.values[name]; // Formik'ten gelen mevcut değerleri al

          // Seçili değerleri react-select için uygun formata dönüştür
          const formattedValue = isMultiSelect
            ? options.filter((option) => selectedValues.includes(option.value))
            : options.find((option) => option.value === selectedValues);

          return (
            <Select
              id={field.name}
              styles={customStyles}
              options={options.filter((option) => !selectedOptions.some((selected) => selected.value === option.value))}
              placeholder={placeholder}
              value={formattedValue}
              onChange={(options) => handleSelectChange(options as SelectOption[])} // onChange eklendi
              className="block w-full mt-1 text-xs focus:border-primary focus:outline-primary hover:border-primary"
              isMulti={isMultiSelect}
            />
          );
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
  );
}