/* eslint no-unneeded-ternary: "error" */
import React, { useEffect, useState } from "react";
import { Form, InputGroup, OverlayTrigger, Tooltip } from "react-bootstrap";


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
    showAsterisk,
    maxLength,
    minLength,
    tooltip,
    tooltipIcon,
    tooltipText,
    tooltipClass,
  } = props;

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const renderInput = () => {
    return (
      <>
        <Form.Control
          id={id}
          value={inputValue}
          // onChange={(e) => {
          //   setInputValue(e.target.value);
          //   if (onChange) onChange(e.target.value);
          // }}
          onChange={(e) => {
            const newValue = e?.target?.value;
            if (newValue?.length <= maxLength) {  // Optional check to enforce maxLength in the onChange handler
              setInputValue(newValue);
              if (onChange) onChange(newValue);
            }else{
              setInputValue(newValue);
              if (onChange) onChange(newValue);
            }
          }}
          name={name}
          type={type}
          placeholder={placeholder}
          className={inputClass}
          maxLength={maxLength}
          disabled={disabled}
          minLength={minLength}
        />
      </>
    );
  };

  const renderTooltip = (props) => (
    <Tooltip {...props}>{tooltip ? tooltip : ""}</Tooltip>
  );

  return (
    <>
      <Form.Group className={containerClass}>
        {tooltip && label ? (
          <Form.Label>
            {" "}
            {label}
            {showAsterisk && (
              <sup className="text-danger stark-label-astrisk">*</sup>
            )}{" "}
            <OverlayTrigger placement="top" overlay={renderTooltip}>
              <i className={tooltipIcon}>
                <span className={tooltipClass}>{tooltipText}</span>
              </i>
            </OverlayTrigger>
          </Form.Label>
        ) : (
          label && (
            <Form.Label>
              {" "}
              {label}
              {showAsterisk && (
                <sup className="text-danger stark-label-astrisk">*</sup>
              )}{" "}
            </Form.Label>
          )
        )}

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
