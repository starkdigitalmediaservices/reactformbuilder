import React, { useState, useEffect } from "react";
import { Form, OverlayTrigger, Tooltip, Input } from "react-bootstrap";
import Info from "../assets/info.png";

export default function CheckboxComponent(props) {
  const {
    value,
    onChange,
    type,
    disabled,
    options,
    inputClass,
    containerClass,
    label,
    inline,
    errorMessage,
    name,
    showAsterisk,
    tooltip,
    tooltipIcon,
    tooltipText,
    tooltipClass,
  } = props;

  const [selectedValues, setSelectedValues] = useState([]);

  useEffect(() => {
    const allValues = value && value.length ? [...value] : [];
    setSelectedValues([...allValues]);
  }, [value]);

  const renderTooltip = (props) => (
    <Tooltip {...props}>{tooltip ? tooltip : ""}</Tooltip>
  );

  return (
    <>
      <Form.Group className={containerClass}>
        {options.length === 0 ? (
          <>
            <Form.Check
              type={type}
              id={name}
              value={name}
              name={name}
              label={
                <Form.Label>
                  {" "}
                  {label}
                  {showAsterisk && (
                    <sup className="text-danger stark-label-astrisk">*</sup>
                  )}{" "}
                  {tooltip ? (
                    <OverlayTrigger placement="top" overlay={renderTooltip}>
                      <i className={tooltipIcon}>
                        <span className={tooltipClass}>{tooltipText}</span>
                      </i>
                    </OverlayTrigger>
                  ) : null}
                </Form.Label>
              }
              onChange={(e) => {
                console.log(e.target.checked);
                const allValues = [...selectedValues];
                const currentValue = e.target.value;
                const currentIndex = allValues.indexOf(currentValue);
                if (currentIndex > -1) allValues.splice(currentIndex, 1);
                else allValues.push(currentValue);
                setSelectedValues(allValues);
                if (onChange) onChange(allValues);
              }}
              checked={selectedValues.includes(name)}
            />
          </>
        ) : (
          <>
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
                      const allValues = [...selectedValues];

                      const currentValue = e.target.value;
                      const currentIndex = allValues.indexOf(currentValue);
                      if (currentIndex > -1) allValues.splice(currentIndex, 1);
                      else allValues.push(currentValue);
                      setSelectedValues(allValues);
                      if (onChange) onChange(allValues);
                    }}
                    label={op.label}
                    disabled={disabled}
                    className={inputClass}
                    checked={selectedValues.includes(op.value)}
                    inline={inline}
                  />
                ))}
            </div>
          </>
        )}
        <Form.Text className="text-danger">{errorMessage}</Form.Text>
      </Form.Group>
    </>
  );
}
