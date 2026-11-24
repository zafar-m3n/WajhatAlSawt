import ReactSelect from 'react-select'

/** react-select styled with the site tokens (unstyled mode + Tailwind classes). */
export default function Select({ variant = 'boxed', ...props }) {
  const control =
    variant === 'underline'
      ? 'border-0 border-b border-line bg-transparent py-2 text-17'
      : 'rounded-[10px] border border-line bg-fern px-3 py-2 text-15'
  return (
    <ReactSelect
      unstyled
      classNamePrefix="ws"
      classNames={{
        control: ({ isFocused }) => `${control} min-h-11 cursor-pointer ${isFocused ? 'border-mint' : 'hover:border-mint/60'}`,
        placeholder: () => 'text-sage',
        singleValue: () => 'text-linen',
        input: () => 'text-linen',
        valueContainer: () => 'gap-1',
        indicatorsContainer: () => 'text-sage',
        dropdownIndicator: ({ selectProps }) => `pl-2 transition-transform ${selectProps.menuIsOpen ? 'rotate-180 text-mint' : ''}`,
        menu: () => 'mt-2 overflow-hidden rounded-[12px] border border-line bg-moss py-1.5 shadow-[0_24px_48px_-16px_rgb(0_0_0/0.7)]',
        menuList: () => 'max-h-80',
        groupHeading: () => 'px-4 pt-3 pb-1 text-13 text-sage',
        option: ({ isFocused, isSelected }) =>
          `cursor-pointer px-4 py-2.5 text-15 ${isSelected ? 'text-mint' : 'text-linen'} ${isFocused ? 'bg-fern' : ''}`,
        noOptionsMessage: () => 'px-4 py-3 text-sage',
      }}
      {...props}
    />
  )
}
