import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { Button } from 'react-bootstrap';

const CustomInput = React.forwardRef((props, ref) => {
  const { onClick, value } = props;
  return (
    <Button
      variant="dark"
      onClick={onClick}
      ref={ref}
    >
      {value}
    </Button>
  );
});

CustomInput.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string
};

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
    customInput={<CustomInput />}
    // onChangeRaw={e => e.preventDefault()}
    onChange={val => onChange(name, val)}
    onClickOutside={() => {
      onClickOutside(name, true);
      validate(value);
    }}
    // className={`form-control ${isValid ? 'is-valid' : ''} ${isInvalid ? 'is-invalid' : ''}`}
    placeholderText={placeholder}
    {...props}
  >
    {children}
  </DatePicker>
);

export default DatePickerField;
