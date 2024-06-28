import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";

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
    inputClass,
    countryCodeEditable,
    tooltipIcon,
    tooltipText,
    tooltipClass,
    enableSearch,
    disableSearchIcon,
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

      <div>
        <PhoneInput
          className={inputClass}
          placeholder={placeholder}
          inputClass={"form-control stark-phone-input"}
          value={inputValue}
          limitMaxLength={limitMaxLength}
          onChange={(e) => {
            setInputValue(e);
            if (onChange) onChange(e);
          }}
          countryCodeEditable={countryCodeEditable}
          country={defaultCountry}
          onlyCountries={countries}
          enableSearch={enableSearch}
          disableSearchIcon={disableSearchIcon}
        />
      </div>
      <Form.Text className="text-danger">{errorMessage}</Form.Text>
    </Form.Group>
  );
};

export default PhoneInputComponent;
