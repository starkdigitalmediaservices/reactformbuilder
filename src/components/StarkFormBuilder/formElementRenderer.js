import React from 'react';
import { Form } from 'react-bootstrap';
import { TextInput, TextAreaInput, FileInput, RadioInput, CheckboxInput, DropdownInput, DateTimePicker } from './FormElements';

export default function FormElementRenderer(props) {
  const { formInput } = props;

  const renderInput = (input) => {
    switch (String(input.type).toLowerCase()) {
      case 'text':
      case 'email':
      case 'number':
        return <TextInput {...input} />;

      case 'textarea':
        return <TextAreaInput {...input} />;

      case 'file':
        return <FileInput {...input} />;

      case 'radio':
        return <RadioInput {...input} />;

      case 'checkbox':
        return <CheckboxInput {...input} />;

      case 'select':
        return <DropdownInput {...input} />;

      case 'date':
        return <DateTimePicker {...input} />;

      case 'switch':
        return (
          <Form.Group className={formInput.classNames}>
            <Form.Label>{formInput.label}</Form.Label>
            <Form.Check
              type="switch"
              id={formInput.id}
              label={formInput.label}
            />

            <Form.Text className="text-muted">This is sample text</Form.Text>
          </Form.Group>
        );

      default:
        return (
          <></>
        );
    }
  };

  return (
    <>
      {renderInput(formInput)}
    </>
  );
}
