import React from 'react';
import { Container } from 'react-bootstrap';
import FormRenderer from './formRenderer';
import './style.css';

export default function StarkFormBuilder(props) {
  const { containerClass, formHeaderClass, formInputs, formSections, formHeading, onFormSubmit, callbacks, options, defaultFormValues, currentUser, submitBtnText, resetBtnText, showResetBtn, onFormReset, btnContainerClass, isStepForm, stepFormProps } = props;
  return (
    <>
      <Container>
        <div className={`stark-form-builder ${containerClass || ''}`}>
          <div className={`stark-form-header ${formHeaderClass || ''}`}>
            <h3>{formHeading}</h3>
          </div>
          <hr />
          <FormRenderer
            formElements={formInputs}
            sections={formSections}
            onFormSubmit={onFormSubmit}
            callbacks={callbacks}
            options={options}
            defaultFormValues={defaultFormValues}
            currentUser={currentUser}
            submitBtnText={submitBtnText}
            resetBtnText={resetBtnText}
            showResetBtn={showResetBtn}
            onFormReset={onFormReset}
            btnContainerClass={btnContainerClass}
            isStepForm={isStepForm}
            stepFormProps={stepFormProps}
          />
        </div>
      </Container>
    </>
  );
}
