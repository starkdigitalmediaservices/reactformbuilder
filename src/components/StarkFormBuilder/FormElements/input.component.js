/* eslint no-unneeded-ternary: "error" */
import React, { useEffect, useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

export default function InputComponent(props) {
  const {
    label,
    placeholder,
    id,
    value,
    onChange,
    name,
    inputClass,
    inputIcon,
    type,
    containerClass,
    inputVarible,
    errorMessage,
    disabled,
    showAsterisk
  } = props;

  console.log('errorMessage', errorMessage);

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const renderInput = () => {
    return (
      <>
        <Form.Control
          id={id}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (onChange) onChange(e.target.value);
          }}
          name={name}
          type={type}
          placeholder={placeholder}
          className={inputClass}
          disabled={disabled}
        />
      </>
    );
  };

  return (
    <>
      <Form.Group className={containerClass}>
        {label && <Form.Label> {label}{showAsterisk && (<sup className="text-danger stark-label-astrisk">*</sup>)} </Form.Label>}
        {inputIcon && <>{inputIcon}</>}
        {inputVarible ? (
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>{inputVarible}</InputGroup.Text>
            </InputGroup.Prepend>
            {renderInput()}
          </InputGroup>
        ) : (
          <>{renderInput()}</>
        )}
        <Form.Text className="text-danger">{errorMessage}</Form.Text>
      </Form.Group>
    </>
  );
}
