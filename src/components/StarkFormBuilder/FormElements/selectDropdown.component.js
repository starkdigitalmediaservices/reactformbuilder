import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";

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
    errorMessage,
    showAsterisk,
    classNamePrefix,
    disabled,
    isSearchable,
    placeholder,
    isClearable,
    tooltip,
    tooltipIcon,
    tooltipText,
    tooltipClass,
  } = props;

  const [inputValue, setInputValue] = useState(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const renderTooltip = (props) => (
    <Tooltip {...props}>{tooltip ? tooltip : ""}</Tooltip>
  );

  return (
    <>
      <Form.Group className={containerClass}>
        {/* {label && (<Form.Label>{label}{showAsterisk && (<sup className="text-danger stark-label-astrisk">*</sup>)}</Form.Label>)} */}
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
          classNamePrefix={classNamePrefix}
          isDisabled={disabled}
          isSearchable={isSearchable}
          placeholder={placeholder}
          isClearable={isClearable}
        />
        <Form.Text className="text-danger">{errorMessage}</Form.Text>
      </Form.Group>
    </>
  );
}
