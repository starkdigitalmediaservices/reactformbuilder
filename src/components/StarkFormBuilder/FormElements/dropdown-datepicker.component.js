import React, { useState, useEffect } from "react";
import { SelectDatepicker } from "react-select-datepicker";

import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";

export default function SelectDateTimePicker(props) {
  const {
    containerClass,
    label,
    selected,
    startDate,
    endDate,
    onChange,
    minDate,
    maxDate,
    isClearable,
    dateFormat,
    showMonthYearPicker,
    showYearPicker,
    disabled,
    showTimeSelect,
    showTimeSelectOnly,
    timeIntervals,
    timeCaption,
    inputClass,
    showYearDropdown,
    yearDropdownItemNumber,
    showMonthDropdown,
    showMonthYearDropdown,
    scrollableYearDropdown,
    selectsRange,
    selectsStart,
    selectsEnd,
    withPortal,
    inline,
    placeholder,
    errorMessage,
    showAsterisk,
    onKeyDown,
    tooltip,
    tooltipIcon,
    tooltipText,
    tooltipClass,
  } = props;
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    setSelectedDate(selected);
  }, [selected]);

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
          selectedDate={selectedDate}
          onDateChange={(dt) => {
            setSelectedDate(dt);
            if (onChange) onChange(dt);
          }}
          hideLabels={true}
          order="month/day/year"
        />
      </div>
      <Form.Text className="text-danger">{errorMessage}</Form.Text>
    </Form.Group>
  );
}
