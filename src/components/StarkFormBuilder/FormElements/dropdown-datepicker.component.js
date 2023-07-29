import React, { useState, useCallback } from "react";
import { SelectDatepicker } from "react-select-datepicker";

import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";

export default function SelectDateTimePicker(props) {
  const {
    containerClass,
    id,
    hasError,
    monthRef,
    yearRef,
    dayRef,
    className,
    label,
    startDate,
    endDate,
    minDate,
    maxDate,
    name,
    selectsRange,
    showAsterisk,
    onKeyDown,
    tooltip,
    tooltipIcon,
    tooltipText,
    tooltipClass,
    order,
    selectedDate,
  } = props;

  const [value, setValue] = useState(null);

  const onDateChange = useCallback((date) => {
    setValue(date);
  }, []);

  const renderTooltip = (props) => (
    <Tooltip {...props}>{tooltip ? tooltip : ""}</Tooltip>
  );

  return (
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
      <div>
        <SelectDatepicker
          selectedDate={value}
          onDateChange={onDateChange}
          hideLabels={true}
          hasError={true}
        />
      </div>
      <Form.Text className="text-danger">{hasError}</Form.Text>
    </Form.Group>
  );
}
