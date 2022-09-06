import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { Form, InputGroup } from 'react-bootstrap';

const PhoneInputComponent = (props) => {
  const { input, placeholder, onChange, defaultCountry, label, showAsterisk, containerClass, errorMessage } = props;
  const [value, setValue] = useState();
  console.log('value', value);
  return (

    <Form.Group className={containerClass}>
      {label && <Form.Label> {label}{showAsterisk && (<sup className="text-danger stark-label-astrisk">*</sup>)} </Form.Label>}
      {/* {inputIcon && <>{inputIcon}</>} */}
      {/* <div className='form-control'> */}
      <PhoneInput
        // className='form-control'
        placeholder={placeholder}
        value={value}
        onChange={setValue}
        defaultCountry={defaultCountry}
      />
      {/* </div> */}
      {/* </Form.Control> */}
      <Form.Text className="text-danger">{errorMessage}</Form.Text>
    </Form.Group>


  )
}

export default PhoneInputComponent