/* eslint-disable */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Stepper from "react-stepper-horizontal";
import SimpleReactValidator from "simple-react-validator";
import FormElementRenderer from "./formElementRenderer";
import CustomFunctions from "./helper/customFunctions";

export default function FormRenderer(props) {
  const simpleValidator = useRef(new SimpleReactValidator());
  const {
    sections,
    onFormSubmit,
    onFormDraft,
    callbacks,
    options,
    defaultFormValues,
    currentUser,
    submitBtnText,
    resetBtnText,
    showDraftBtn,
    draftBtnText,
    showResetBtn,
    onFormReset,
    btnContainerClass,
    refreshCounter,
    formClass,
    showBtnClass,
    addMoreRemoveCallback,
    addMoreAddCallback,
  } = props;
  const [formValues, setFormValues] = useState({});
  const [allFormFields, setAllFormFields] = useState([]);
  const [allFormSections, setAllFormSections] = useState([]);
  const [allAddMoreFields, setAddMoreFields] = useState({});
  const [submitCount, updateSubmitCount] = useState(0);
  const [displayedFields, updateDisplayedFields] = useState({});

  const setDefaultFormValues = (resetForm = false) => {
    let allFields = [];
    const addMoreFields = {};
    sections.map((section) => {
      allFields = [...allFields, ...section.fields];
      return section;
    });
    const allFormValues = {};
    allFields.map((field) => {
      if (!resetForm) {
        if (formValues[field.name]) {
          allFormValues[field.name] = formValues[field.name];
        } else {
          allFormValues[field.name] =
            defaultFormValues && defaultFormValues[field.name]
              ? defaultFormValues[field.name]
              : field.value;
        }
      } else {
        allFormValues[field.name] = "";
      }
      if (field.type === "addmore") {
        if (!resetForm) {
          if (formValues[field.name]) {
            allFormValues[field.name] = formValues[field.name];
          } else {
            allFormValues[field.name] =
              typeof allFormValues[field.name] === "object"
                ? allFormValues[field.name]
                : [];
          }
          const amFields =
            allFormValues[field.name] &&
            typeof allFormValues[field.name] === "object"
              ? allFormValues[field.name]
              : [];
          // addMoreFields[field.name] = [field.fields];
          addMoreFields[field.name] = Array(amFields.length || 1).fill(
            field.fields
          );
        } else {
          allFormValues[field.name] = [];
          addMoreFields[field.name] = Array(1).fill(field.fields);
        }
      }

      return field;
    });
    setFormValues(allFormValues);
    setAllFormSections(sections);
    setAddMoreFields(addMoreFields);
    setAllFormFields([...allFields]);
  };
  useEffect(() => {
    setDefaultFormValues();
  }, []);

  useEffect(() => {
    setDefaultFormValues();
    setFormValues({ ...defaultFormValues });
  }, [defaultFormValues, refreshCounter]);

  const updateFormValues = (e, field, fieldIndex = 0, aField = {}) => {
    if (!CustomFunctions.checkIfEmpty(callbacks, "O")) {
      if (callbacks[field.callback]) callbacks[field.callback](e);
    }
    const sumUpdates = [];
    const allValues = formValues;
    if (field.type === "text" && field.operation === "sum" && !isNaN(e)) {
      allValues[field.name] = e;
      let sum = 0;
      field.fieldsToSum.map((f) => {
        sum += Number(allValues[f]);
        return f;
      });
      allValues[field.sumField] = isNaN(sum) ? "" : sum;
      sumUpdates.push("text");
    } else if (field.type === "text" && field.maxNumber > 0 && e != "") {
      addFieldNew(e, field);
      allValues[field.name] =
        field.type === "date" ? (e ? new Date(e) : null) : e;
    } else if (field.type === "addmore") {
      let fieldValues = formValues[field.name];
      if (!fieldValues) fieldValues = [];
      if (!CustomFunctions.checkIfEmpty(callbacks, "O")) {
        if (callbacks[aField.callback]) callbacks[aField.callback](e);
      }
      if (!fieldValues[fieldIndex]) fieldValues[fieldIndex] = {};
      fieldValues[fieldIndex][aField.name] =
        aField.type === "date" ? (e ? new Date(e) : null) : e;
      allValues[field.name] = fieldValues;
    } else {
      allValues[field.name] =
        field.type === "date" ? (e ? new Date(e) : null) : e;
    }
    if (!CustomFunctions.checkIfEmpty(field.fieldsToReset, "A")) {
      field.fieldsToReset.map((f) => {
        allValues[f] = null;
        return f;
      });
    }
    const forceUpdateFields = [
      "date",
      "select",
      "radio",
      "checkbox",
      ...sumUpdates,
    ];
    setFormValues(
      forceUpdateFields.includes(aField.type || field.type)
        ? { ...allValues }
        : allValues
    );
  };

  const getFieldType = (fieldName = "") => {
    const selectedField = allFormFields.filter(
      (field) => field.name === fieldName
    );
    if (CustomFunctions.checkIfEmpty(selectedField, "A")) return "";
    return {
      type: selectedField[0].type,
      isMulti: selectedField[0].isMulti,
      maxNumber: selectedField[0].maxNumber,
    };
  };

  const checkFieldCondition = (condition) => {
    const fieldType = getFieldType(condition.name);
    let conditionResults = true;
    let checkboxValue = [];
    let textValue = "";
    let dropdownValue = fieldType.isMulti ? [] : {};

    if (fieldType.type === "checkbox") {
      checkboxValue = CustomFunctions.checkIfEmpty(
        formValues[condition.name],
        "A"
      )
        ? []
        : formValues[condition.name];
    }

    if (fieldType.type === "select") {
      dropdownValue = CustomFunctions.checkIfEmpty(formValues[condition.name])
        ? dropdownValue
        : formValues[condition.name];
    }
    if (
      fieldType.type === "text" &&
      fieldType.maxNumber &&
      fieldType.maxNumber > 0
    ) {
      textValue = CustomFunctions.checkIfEmpty(formValues[condition.name])
        ? textValue
        : formValues[condition.name];
    }
    switch (condition.condition) {
      case "===":
      case "==":
        if (fieldType.type === "checkbox") {
          conditionResults = checkboxValue.includes(condition.value);
          break;
        }
        if (
          fieldType.type === "text" &&
          fieldType.maxNumber &&
          fieldType.maxNumber > 0
        ) {
          let cond = condition.value.split(",");
          conditionResults = cond.includes(textValue);
          break;
        }
        if (fieldType.type === "select") {
          if (fieldType.isMulti) {
            const values = [...dropdownValue].map((v) => v.value);
            conditionResults = values.includes(condition.value);
            break;
          }
          conditionResults = dropdownValue.value === condition.value;
          break;
        }

        conditionResults = formValues[condition.name] === condition.value;
        break;
      case "!=":
        if (fieldType === "checkbox") {
          conditionResults = !checkboxValue.includes(condition.value);
          break;
        }
        if (fieldType.type === "select") {
          if (fieldType.isMulti) {
            const values = [...dropdownValue].map((v) => v.value);
            conditionResults = !values.includes(condition.value);
            break;
          }
          conditionResults = dropdownValue.value !== condition.value;
          break;
        }
        conditionResults = formValues[condition.name] != condition.value;
        break;
      case ">=":
        conditionResults = formValues[condition.name] >= condition.value;
        break;
      case ">":
        conditionResults = formValues[condition.name] > condition.value;
        break;
      case "<":
        conditionResults = formValues[condition.name] < condition.value;
        break;
      case "<=":
        conditionResults = formValues[condition.name] <= condition.value;
        break;
      case "!empty":
        conditionResults = !CustomFunctions.checkIfEmpty(
          formValues[condition.name]
        );
        break;
      case "empty":
        conditionResults = CustomFunctions.checkIfEmpty(
          formValues[condition.name]
        );
        break;
      default:
        conditionResults = true;
        break;
    }
    return conditionResults;
  };

  const checkPermittedUser = (allowedUsers = []) => {
    if (!currentUser || !allowedUsers || !allowedUsers.length) return true;
    return allowedUsers.includes(Number(currentUser));
  };

  const checkDisplayConditions = (field) => {
    if (CustomFunctions.checkIfEmpty(field.displayWhen, "O")) return true;
    if (CustomFunctions.checkIfEmpty(field.displayWhen.conditions, "A"))
      return true;

    const conditionResults = [];
    let displayField = true;
    field.displayWhen.conditions.map((condition) => {
      conditionResults.push(checkFieldCondition(condition));
      return condition;
    });

    // Get all satisfied conditions
    const filteredResult = conditionResults.filter((condition) => condition);

    switch (
      CustomFunctions.toLowerCase(field.displayWhen.displayWhenRelation)
    ) {
      case "and":
        if (filteredResult.length !== conditionResults.length)
          displayField = false;
        break;
      case "or":
        if (!filteredResult.length) displayField = false;
        break;
      default:
        displayField = true;
    }
    return displayField;
  };

  const getFieldValidation = (
    field,
    isAddMore = false,
    fieldIndex = 0,
    parentField = {}
  ) => {
    if (CustomFunctions.checkIfEmpty(field.validations, "A")) return "";
    let validations = "";
    field.validations.map((item) => {
      // If applywhen condition is empty
      if (CustomFunctions.checkIfEmpty(item.applyWhen, "A")) {
        if (item.type)
          validations = `${validations}${validations ? "|" : ""}${item.type}`;
        return item;
      }

      // If applywhen has some conditions
      const conditionResults = [];
      item.applyWhen.map((condition) => {
        conditionResults.push(checkFieldCondition(condition));
        return condition;
      });

      // Get all satisfied conditions
      const filteredResult = conditionResults.filter((condition) => condition);

      switch (CustomFunctions.toLowerCase(item.applyWhenRelation)) {
        case "and":
          if (filteredResult.length !== conditionResults.length) return item;
          break;
        case "or":
          if (!filteredResult.length) return item;
          break;
        default:
          return item;
      }

      if (item.type)
        validations = `${validations}${validations ? "|" : ""}${item.type}`;
      return item;
    });

    if (!validations) return "";
    let defaultValue = formValues[field.name];
    if (isAddMore) {
      const fVal = CustomFunctions.checkIfEmpty(
        formValues[parentField.name],
        "A"
      )
        ? []
        : formValues[parentField.name];
      if (!fVal[fieldIndex]) fVal[fieldIndex] = {};
      const val = fVal[fieldIndex][field.name];
      defaultValue = field.type === "date" ? (val ? new Date(val) : null) : val; //fVal[fieldIndex][field.name];
    }
    if (field.errorMessage) {
      return simpleValidator.current.message(
        field.label,
        defaultValue,
        validations,
        field.errorMessage
      );
    } else {
      return simpleValidator.current.message(
        field.label,
        defaultValue,
        validations
      );
    }
  };

  const RenderSectionTitle = ({ title }) => {
    return (
      <>
        <div className={``}>
          <h5>{title}</h5>
        </div>
        <hr />
      </>
    );
  };

  const getFieldLayout = (layout = "1column") => {
    let columns = 1;
    switch (layout) {
      case "1column":
        columns = 1;
        break;
      case "2column":
        columns = 2;
        break;
      case "3column":
        columns = 3;
        break;
      case "4column":
        columns = 4;
        break;
      default:
        columns = 1;
    }
    return columns;
  };

  const RenderFormField = ({
    field,
    onChange,
    isAddMore,
    fieldIndex,
    parentField,
  }) => {
    const extraProps = {};
    if (field.type === "date") extraProps.selected = formValues[field.name];
    // if (field.type === 'select') {
    //   extraProps.options = options[field.name] ? dropdownOptions[field.name] : field.options;
    // }
    if (["select", "checkbox"].includes(field.type)) {
      extraProps.options = options[field.name]
        ? options[field.name]
        : field.options;
    }

    if (["checkbox", "radio"].includes(field.type)) {
      extraProps.name = `${field.name}[${fieldIndex}]`;
    }

    let defaultValue = formValues[field.name];
    if (isAddMore) {
      const fVal = CustomFunctions.checkIfEmpty(
        formValues[parentField.name],
        "A"
      )
        ? []
        : formValues[parentField.name];
      if (!fVal[fieldIndex]) fVal[fieldIndex] = {};
      if (field.type === "date")
        extraProps.selected = fVal[fieldIndex][field.name];
      if (field.minDateSelector)
        extraProps.minDate = fVal[fieldIndex][field.minDateSelector];
      if (field.maxDateSelector)
        extraProps.maxDate = fVal[fieldIndex][field.maxDateSelector];
      defaultValue = fVal[fieldIndex][field.name];
    }
    return (
      <>
        <FormElementRenderer
          formInput={{
            ...field,
            ...extraProps,
            value: defaultValue,
            onChange: useCallback(onChange, []),
            errorMessage: getFieldValidation(
              field,
              isAddMore,
              fieldIndex,
              parentField
            ),
          }}
        />
      </>
    );
  };

  const addField = (field) => {
    if (addMoreAddCallback) addMoreAddCallback();
    const fields = allAddMoreFields[field.name];
    const foundFields = allFormFields.filter(
      (f) => f.type === "addmore" && f.name === field.name
    );
    const fieldsToAdd = CustomFunctions.checkIfEmpty(foundFields, "A")
      ? []
      : foundFields[0].fields;
    fields.push(fieldsToAdd);
    setAddMoreFields({
      ...allAddMoreFields,
      [field.name]: fields,
    });
  };

  const addFieldNew = (e, field) => {
    for (let index = 1; index < e; index++) {
      const fields = allAddMoreFields[field.childElement];
      const foundFields = allFormFields.filter(
        (f) =>
          f.type === "addmore" &&
          f.name === field.childElement &&
          field.maxNumber > 0
      );
      const fieldsToAdd = CustomFunctions.checkIfEmpty(foundFields, "A")
        ? []
        : foundFields[0].fields;
      fields.push(fieldsToAdd);
      setAddMoreFields({
        ...allAddMoreFields,
        [field.name]: fields,
      });
    }
  };

  const removeField = (field, fieldIndex) => {
    const fields = allAddMoreFields[field.name];
    fields.splice(fieldIndex, 1);
    const allVals = formValues;
    const fVal = CustomFunctions.checkIfEmpty(allVals[field.name], "A")
      ? []
      : allVals[field.name];
    if (fVal.length) fVal.splice(fieldIndex, 1);
    allVals[field.name] = fVal;
    setFormValues(allVals);
    setAddMoreFields({
      ...allAddMoreFields,
      [field.name]: fields,
    });
    if (addMoreRemoveCallback) addMoreRemoveCallback(fieldIndex);
  };

  const RenderSingleFormField = ({ field, columns }) => {
    const displayField = checkDisplayConditions(field);
    const allDisplayFields = displayedFields;
    allDisplayFields[field.name] = displayField;
    updateDisplayedFields(allDisplayFields);
    if (!displayField) return <></>;
    const col = 12 / Number(columns);
    const isAddMoreField = field.type === "addmore";
    const addMoreFields = isAddMoreField ? allAddMoreFields[field.name] : [];
    const fieldCol = isAddMoreField
      ? 12 / getFieldLayout(field.fieldLayout)
      : col;

    return (
      <>
        <Col md={col}>
          {isAddMoreField ? (
            <Row className={field.sectionClass}>
              <Form.Label>{field.label}</Form.Label>
              {addMoreFields.map((aField, fieldIndex) => {
                return (
                  <>
                    {aField.map((bField) => (
                      <Col md={fieldCol}>
                        <RenderFormField
                          field={{ ...bField }}
                          column={col}
                          onChange={(e) => {
                            updateFormValues(e, field, fieldIndex, bField);
                          }}
                          isAddMore
                          fieldIndex={fieldIndex}
                          parentField={field}
                        />
                      </Col>
                    ))}
                  </>
                );
              })}
            </Row>
          ) : (
            <RenderFormField
              field={{ ...field }}
              column={col}
              onChange={(e) => {
                updateFormValues(e, field);
              }}
            />
          )}
        </Col>
      </>
    );
  };

  const RenderSection = ({ section, secIndex }) => {
    const {
      displaySection,
      sectionTitle,
      displaySectionTitle,
      fields,
      sectionLayout,
      containerClass,
    } = section;
    const isPermittedUser = checkPermittedUser(section.allowedUsers);
    if (!displaySection || !isPermittedUser) return <></>;
    let columns = getFieldLayout(sectionLayout);

    return (
      <>
        <div className={containerClass}>
          {displaySectionTitle && <RenderSectionTitle title={sectionTitle} />}
          <Row>
            {fields.map((field, fieldIndex) => (
              <>
                <RenderSingleFormField
                  field={field}
                  columns={columns}
                  secIndex={secIndex}
                  index={fieldIndex}
                />
              </>
            ))}
          </Row>
        </div>
      </>
    );
  };

  const validateAndSubmitForm = () => {
    if (!simpleValidator.current.allValid()) {
      simpleValidator.current.showMessages();
      setFormValues({ ...formValues });
      return;
    }

    let finalFormValues = {};
    Object.keys(displayedFields).map((field) => {
      if (displayedFields[field]) {
        finalFormValues[field] = formValues[field];
      }
      return field;
    });
    console.log("finalFormValues", finalFormValues);
    if (onFormSubmit) onFormSubmit(finalFormValues);
  };

  useEffect(() => {
    if (!submitCount) return;
    validateAndSubmitForm();
  }, [submitCount]);

  const submitForm = (e) => {
    e.preventDefault();
    console.log("submitForm");
    updateSubmitCount(submitCount + 1);
  };

  const onDraftSubmit = (e) => {
    e.preventDefault();
    let finalFormValues = {};
    Object.keys(displayedFields).map((field) => {
      if (displayedFields[field]) {
        finalFormValues[field] = formValues[field];
      }
      return field;
    });
    if (onFormDraft) onFormDraft(finalFormValues);
  };

  const resetForm = (e) => {
    e.preventDefault();
    if (simpleValidator && simpleValidator.current)
      simpleValidator.current.hideMessages();
    setDefaultFormValues(true);
    if (onFormReset) onFormReset();
  };
  simpleValidator.current.purgeFields();
  return (
    <>
      <Form
        className={`${formClass}`}
        onSubmit={submitForm}
        onReset={resetForm}
      >
        {allFormSections &&
          allFormSections.map((section, secIndex) => {
            return (
              <React.Fragment key={secIndex}>
                <RenderSection section={section} secIndex={secIndex} />
              </React.Fragment>
            );
          })}

        <div
          className={
            showBtnClass
              ? `btn-group mt-5 ${btnContainerClass}`
              : `${btnContainerClass}`
          }
        >
          <>
            <Button variant="primary" className="mr-5" type="submit">{`${
              submitBtnText || "Submit"
            }`}</Button>
            {showResetBtn && (
              <Button variant="secondary" className="mr-5" type="reset">{`${
                resetBtnText || "Reset"
              }`}</Button>
            )}
            {showDraftBtn && (
              <Button
                variant="secondary"
                onClick={(e) => {
                  onDraftSubmit(e);
                }}
              >{`${draftBtnText || "Save Draft"}`}</Button>
            )}
          </>
        </div>
      </Form>
    </>
  );
}
