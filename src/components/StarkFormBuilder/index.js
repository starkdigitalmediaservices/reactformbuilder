import React from "react";
import { Container } from "react-bootstrap";
import FormRenderer from "./formRenderer";
import "./style.css";
import customFunctions from "./helper/customFunctions";

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
  } = props;

  const formValues = {
    // team_id_checkbox: {
    //   label: "Project Management",
    //   value: "1",
    // },
    // "mqid-3": ["11-am not"],
    // "mqid-4": ["No"],

    // name: "1",
    // due_date_new: new Date(customFunctions.getDate("2023-08-31")),
    due_date_new: new Date("12/10/2023"),
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
