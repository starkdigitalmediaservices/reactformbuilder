/* eslint no-unneeded-ternary: "error" */
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Form } from 'react-bootstrap';

export default function DateTimePicker(props) {
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
    onKeyDown
  } = props;

  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    setSelectedDate(selected);
  }, [selected]);

  const convertDate = (dt) => {
    const newDate = new Date(dt);
    return `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}`;
  };

  const getDateRange = () => {
    if (!startDate) return '';
    return `${startDate ? convertDate(startDate) : ''} - ${endDate ? convertDate(endDate) : ''}`;
  };

  const propValue = {};
  if (selectsRange) {
    propValue.value = getDateRange();
  }

  return (
    <Form.Group className={containerClass}>

      {label && (<Form.Label>{label}{showAsterisk && (<sup className="text-danger stark-label-astrisk">*</sup>)}</Form.Label>)}
      <div>
        <DatePicker
          selected={selectedDate}
          startDate={startDate}
          endDate={endDate}
          minDate={minDate}
          maxDate={maxDate}
          isClearable={isClearable}
          disabled={disabled}
          dateFormat={dateFormat}
          showMonthYearPicker={showMonthYearPicker}
          showYearPicker={showYearPicker}
          onChange={(dt) => {
            setSelectedDate(dt);
            if (onChange) onChange(dt);
          }}
          showTimeSelect={showTimeSelect}
          showTimeSelectOnly={showTimeSelectOnly}
          timeIntervals={timeIntervals}
          timeCaption={timeCaption}
          className={`form-control ${inputClass}`}
          showYearDropdown={showYearDropdown}
          yearDropdownItemNumber={yearDropdownItemNumber}
          showMonthDropdown={showMonthDropdown}
          showMonthYearDropdown={showMonthYearDropdown}
          scrollableYearDropdown={scrollableYearDropdown}
          selectsRange={selectsRange}
          selectsStart={selectsStart}
          selectsEnd={selectsEnd}
          withPortal={withPortal}
          inline={inline}
          placeholderText={placeholder}
          onKeyDown={(e) => {
            if (onKeyDown) e.preventDefault();
          }}
          {...propValue}
        />
      </div>
      <Form.Text className="text-danger">{errorMessage}</Form.Text>
    </Form.Group>
  );
}
