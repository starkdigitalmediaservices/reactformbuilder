import React from "react";
import { Container } from "react-bootstrap";
import FormRenderer from "./formRenderer";
import "./style.css";

export default function StarkFormBuilder(props) {
  const {
    containerClass,
    formHeaderClass,
    formInputs,
    formSections,
    formHeading,
    onFormSubmit,
    onFormDraft,
    showDraftBtn,
    draftBtnText,
    callbacks,
    options,
    defaultFormValues,
    currentUser,
    submitBtnText,
    resetBtnText,
    showResetBtn,
    onFormReset,
    btnContainerClass,
    isStepForm,
    stepFormProps,
    refreshCounter,
    formClass,
    showBtnClass,
    addMoreRemoveCallback,
    addMoreAddCallback,
    onInputChange,
  } = props;

  const formValues = {
    name: 2,
    addmore_name: [
      {
        percentage: 70,
        team_id: { value: 2, label: "Development" },
      },
      {
        percentage: 20,
        team_id: { value: 4, label: "Quality Analysis" },
      },
    ],
  };
  return (
    <>
      <Container>
        <div className={`stark-form-builder ${containerClass || ""}`}>
          <div className={`stark-form-header ${formHeaderClass || ""}`}>
            <h3>{formHeading}</h3>
          </div>
          <hr />
          <FormRenderer
            formElements={formInputs}
            sections={formSections}
            onFormSubmit={onFormSubmit}
            callbacks={callbacks}
            options={options}
            defaultFormValues={formValues}
            currentUser={currentUser}
            submitBtnText={submitBtnText}
            resetBtnText={resetBtnText}
            showResetBtn={showResetBtn}
            draftBtnText={draftBtnText}
            onFormDraft={onFormDraft}
            showDraftBtn={showDraftBtn}
            refreshCounter={refreshCounter}
            onFormReset={onFormReset}
            btnContainerClass={btnContainerClass}
            isStepForm={isStepForm}
            stepFormProps={stepFormProps}
            formClass={formClass}
            showBtnClass={showBtnClass}
            addMoreRemoveCallback={addMoreRemoveCallback}
            addMoreAddCallback={addMoreAddCallback}
          />
        </div>
      </Container>
    </>
  );
}
