import React from 'react';
import DatePicker from 'react-datepicker';

const DatePickerField = ({ name, value, onChange, onClickOutside, placeholder, isValid, isInvalid, validate, ...props }) => {
  return (
    <DatePicker
      name={name}
      autoComplete="off"
      selected={value}
      onChange={val => onChange(name, val)}
      onClickOutside={() => {
        onClickOutside(name, true);
        validate(value);
      }}
      className={"form-control" + (isValid ? " is-valid" : "") + (isInvalid ? " is-invalid" : "")}
      placeholderText={placeholder}
      {...props}
    >
      {props.children}
    </DatePicker>
  );
};

export default DatePickerField;
