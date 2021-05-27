import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

export default function RadioComponent(props) {
  const {
    value,
    onChange,
    type,
    disabled,
    options,
    inputClass,
    name,
    containerClass,
    label,
    inline,
    errorMessage
  } = props;

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <>
      <Form.Group className={containerClass}>
        <Form.Label>{label}</Form.Label>
        <div>
          {options &&
            options.map((op) => (
              <Form.Check
                type={type}
                name={name}
                value={op.value}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  if (onChange) onChange(e.target.value);
                }}
                inline={inline}
                label={op.label}
                disabled={disabled}
                className={inputClass}
                checked={inputValue === op.value}
              />
            ))}
        </div>
        <Form.Text className="text-danger">{errorMessage}</Form.Text>
      </Form.Group>
    </>
  );
}
