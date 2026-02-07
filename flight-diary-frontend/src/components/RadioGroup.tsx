interface RadioGroupProps<T extends string> {
  label: string
  name: string
  options: readonly T[]
  value: T
  onChange: (value: T) => void
}

const RadioGroup = <T extends string>({
  label,
  name,
  options,
  value,
  onChange,
}: RadioGroupProps<T>) => {
  return (
    <div>
      <span>{label}</span>
      {options.map((option) => (
        <label key={option}>
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
          />
          {option}
        </label>
      ))}
    </div>
  )
}

export default RadioGroup
