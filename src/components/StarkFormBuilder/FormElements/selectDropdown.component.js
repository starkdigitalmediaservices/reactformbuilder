import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Form } from 'react-bootstrap';

export default function SelectDropdown(props) {
  const {
    label,
    value,
    name,
    inputClass,
    isMulti,
    onChange,
    options,
    containerClass,
    errorMessage
  } = props;

  const [inputValue, setInputValue] = useState(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <>
      <Form.Group className={containerClass}>
        <Form.Label>{label}</Form.Label>
        <Select
          value={inputValue}
          onChange={(e) => {
            setInputValue(e);
            if (onChange) onChange(e);
          }}
          name={name}
          className={inputClass}
          options={options}
          isMulti={isMulti}
        />
        <Form.Text className="text-danger">{errorMessage}</Form.Text>
      </Form.Group>
    </>
  );
}
