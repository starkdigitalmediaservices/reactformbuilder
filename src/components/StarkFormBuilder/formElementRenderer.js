import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import {
  TextInput,
  TextAreaInput,
  FileInput,
  RadioInput,
  CheckboxInput,
  DropdownInput,
  DateTimePicker,
  PhoneInputComponent,
} from "./FormElements";
import CustomFunctions from "./helper/customFunctions";

export default function FormElementRenderer(props) {
  const { formInput } = props;
  const [asteriskToggle, setAsteriskToggle] = useState(false);

  useEffect(() => {
    if (!formInput || CustomFunctions.checkIfEmpty(formInput.validations))
      return;
    const result = formInput.validations.filter((form) =>
      form.type.split("|").includes("required")
    );
    setAsteriskToggle(result.length > 0);
  }, [formInput]);

  const renderInput = (input) => {
    switch (String(input.type).toLowerCase()) {
      case "text":
      case "password":
      case "email":
      case "number":
        return <TextInput showAsterisk={asteriskToggle} {...input} />;

      case "textarea":
        return <TextAreaInput showAsterisk={asteriskToggle} {...input} />;

      case "file":
        return <FileInput showAsterisk={asteriskToggle} {...input} />;

      case "radio":
        return <RadioInput showAsterisk={asteriskToggle} {...input} />;

      case "checkbox":
        return <CheckboxInput showAsterisk={asteriskToggle} {...input} />;

      case "select":
        return <DropdownInput showAsterisk={asteriskToggle} {...input} />;

      case "date":
        return <DateTimePicker showAsterisk={asteriskToggle} {...input} />;

      case "phonenumber":
        return <PhoneInputComponent showAsterisk={asteriskToggle} {...input} />;

      case "switch":
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
        return <></>;
    }
  };

  return <>{renderInput(formInput)}</>;
}
