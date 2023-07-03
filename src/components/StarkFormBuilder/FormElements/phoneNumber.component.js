import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import Info from "../assets/info.png";

const PhoneInputComponent = (props) => {
  const {
    placeholder,
    onChange,
    defaultCountry,
    label,
    showAsterisk,
    containerClass,
    errorMessage,
    value,
    limitMaxLength,
    countries,
    tooltip,
  } = props;
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const renderTooltip = (props) => (
    <Tooltip {...props}>{tooltip ? tooltip : ""}</Tooltip>
  );

  return (
    <Form.Group className={containerClass}>
      {/* {label && <Form.Label> {label}{showAsterisk && (<sup className="text-danger stark-label-astrisk">*</sup>)} </Form.Label>} */}

      {tooltip && label ? (
        <Form.Label>
          {" "}
          {label}
          {showAsterisk && (
            <sup className="text-danger stark-label-astrisk">*</sup>
          )}{" "}
          <OverlayTrigger placement="top" overlay={renderTooltip}>
            <img width={15} src={Info} alt="copy icon" />
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

      <PhoneInput
        className="form-control"
        placeholder={placeholder}
        value={inputValue}
        limitMaxLength={limitMaxLength}
        onChange={(e) => {
          setInputValue(e);
          if (onChange) onChange(e);
        }}
        defaultCountry={defaultCountry}
        countries={countries}
      />
      <Form.Text className="text-danger">{errorMessage}</Form.Text>
    </Form.Group>
  );
};

export default PhoneInputComponent;
