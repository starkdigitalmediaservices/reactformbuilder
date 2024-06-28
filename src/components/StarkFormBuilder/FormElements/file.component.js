import React, { useEffect, useState } from "react";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import FilePlaceHolder from "../assets/file.png"



export default function FileComponent(props) {
  const {
    label,
    id,
    onChange,
    custom,
    type,
    inputClass,
    containerClass,
    accept,
    errorMessage,
    isMulti,
    value,
    showAsterisk,
    bucketType,
    disabled,
    tooltip,
    tooltipIcon,
    tooltipText,
    tooltipClass,
  } = props;

  const [inputFiles, setInputFiles] = useState("");

  useEffect(() => {
    let files = [];
    if (value) files = typeof value === "object" ? [...value] : [value];

    setInputFiles(files);
  }, [value]);

  const renderTooltip = (props) => (
    <Tooltip {...props}>{tooltip ? tooltip : ""}</Tooltip>
  );

  const getImageUrl = (file) => {
    if (typeof file === "object") {
      if (!file.type.match("image.*")) return FilePlaceHolder;
      return URL.createObjectURL(file);
    }
    return file;
  };

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
        <Form.Control
          id={id}
          className={`form-control ${inputClass}`}
          type={type}
          onChange={(e) => {
            const files = e.target.files; // eslint-disable-line
            setInputFiles(Array.from(files).map((file) => file));
            if (onChange) onChange(e.target.files);
          }}
          // label={label}
          custom={custom}
          accept={accept}
          multiple={isMulti}
          disabled={disabled}
        />
        <Form.Text className="text-danger">{errorMessage}</Form.Text>
        {inputFiles && inputFiles.length > 0 && (
          <div className="mt-1">
            {inputFiles.map((file) =>
              bucketType === "internal" ? (
                <img
                  src={getImageUrl(file)}
                  className="stark-form-img"
                  alt="sample"
                  title={getImageUrl(file)}
                />
              ) : (
                <a href={file} target="_blank">
                  Preview
                </a>
              )
            )}
          </div>
        )}
      </Form.Group>
    </>
  );
}
