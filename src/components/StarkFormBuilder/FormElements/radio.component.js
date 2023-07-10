import React, { useEffect, useState } from "react";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import Info from "../assets/info.png";

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
    errorMessage,
    showAsterisk,
    tooltip,
    tooltipIcon,
    tooltipText,
    tooltipClass,
  } = props;

  const [inputValue, setInputValue] = useState("");

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
        <div>
          {options &&
            options.map((op, opi) => (
              <Form.Check
                type={type}
                name={name}
                id={`${name}-${op.value}-${opi}`}
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
