import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import FilePlaceholder from '../assets/file.png';

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
    multiple,
    value
  } = props;

  const [inputFiles, setInputFiles] = useState('');

  useEffect(() => {
    let files = [];
    if (value)
      files = (typeof value === 'object') ? [...value] : [value];

    setInputFiles(files);
  }, [value]);

  const getImageUrl = (file) => {
    if (typeof file === 'object') {
      if (!file.type.match('image.*')) return FilePlaceholder;
      return URL.createObjectURL(file);
    }
    return file;
  };

  return (
    <>
      <Form.Group className={containerClass}>
        <Form.Label>{label}</Form.Label>
        <Form.File
          id={id}
          className={`form-control ${inputClass}`}
          type={type}
          onChange={(e) => {
            const files = e.target.files; // eslint-disable-line
            setInputFiles(Array.from(files).map(file => file));
            if (onChange) onChange(e.target.files);
          }}
          // label={label}
          custom={custom}
          accept={accept}
          multiple={multiple}
        />
        <Form.Text className="text-danger">{errorMessage}</Form.Text>
        {
          inputFiles && inputFiles.length > 0 && (
            <div className="mt-1">
              {
                inputFiles.map((file) => (
                  <img src={getImageUrl(file)} className="stark-form-img" alt="sample" title={getImageUrl(file)} />
                ))
              }
            </div>
          )
        }
      </Form.Group>
    </>
  );
}
