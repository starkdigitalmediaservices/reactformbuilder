import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { Form } from 'react-bootstrap';

const PhoneInputComponent = (props) => {
  const { placeholder, onChange, defaultCountry, label, showAsterisk, containerClass, errorMessage, value, limitMaxLength,countries } = props;
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(value)
  }, [value])

  return (

    <Form.Group className={containerClass}>
      {label && <Form.Label> {label}{showAsterisk && (<sup className="text-danger stark-label-astrisk">*</sup>)} </Form.Label>}
      <PhoneInput
        className='form-control'
        placeholder={placeholder}
        value={inputValue}
        limitMaxLength={limitMaxLength}
        onChange={
          (e) => {
            setInputValue(e)
            if (onChange) onChange(e);
          }
        }
        defaultCountry={defaultCountry}
        countries={countries}
      />
      <Form.Text className="text-danger">{errorMessage}</Form.Text>
    </Form.Group>


  )
}

export default PhoneInputComponent