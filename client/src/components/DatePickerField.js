import React from 'react';
import DatePicker from 'react-datepicker';

const DatePickerField = ({
  name,
  value,
  onChange,
  onClickOutside,
  placeholder,
  isValid,
  isInvalid,
  validate,
  children,
  ...props
}) => (
  <DatePicker
    name={name}
    autoComplete="off"
    selected={value}
    onChange={val => onChange(name, val)}
    onClickOutside={() => {
      onClickOutside(name, true);
      validate(value);
    }}
    className={`form-control ${isValid ? 'is-valid' : ''} ${isInvalid ? 'is-invalid' : ''}`}
    placeholderText={placeholder}
    {...props}
  >
    {children}
  </DatePicker>
);

export default DatePickerField;
