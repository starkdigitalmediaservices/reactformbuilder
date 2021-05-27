/* eslint no-unneeded-ternary: "error" */
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

export default function TextAreaComponent(props) {
  const {
    label,
    placeholder,
    id,
    value,
    onChange,
    name,
    inputClass,
    type,
    containerClass,
    errorMessage,
    disabled,
  } = props;

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <>
      <Form.Group className={containerClass}>
        {label && <Form.Label> {label} </Form.Label>}
        <Form.Control
          as='textarea'
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
        <Form.Text className="text-danger">{errorMessage}</Form.Text>
      </Form.Group>
    </>
  );
}
