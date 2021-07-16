/* eslint-disable */
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormElementRenderer from './formElementRenderer';
import SimpleReactValidator from 'simple-react-validator';
import CustomFunctions from './helper/customFunctions';
import Stepper from 'react-stepper-horizontal';

export default function FormRenderer(props) {
  const simpleValidator = useRef(new SimpleReactValidator());
  const { sections, onFormSubmit, callbacks, options, defaultFormValues, currentUser, submitBtnText, resetBtnText, showResetBtn, onFormReset, btnContainerClass, stepFormProps, isStepForm } = props;
  const stepperProps = stepFormProps || {};
  const [formValues, setFormValues] = useState({});
  const [allFormFields, setAllFormFields] = useState([]);
  const [allFormSections, setAllFormSections] = useState([]);
  const [allAddMoreFields, setAddMoreFields] = useState({});
  const [submitCount, updateSubmitCount] = useState(0);
  const [displayedFields, updateDisplayedFields] = useState({});
  const [stepCounter, updateStepCounter] = useState(0);
  const [currentStepIndex, updateStepIndex] = useState(0);
  const [isClickedNext, updateIsClickedNext] = useState(false);

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
          allFormValues[field.name] = (defaultFormValues && defaultFormValues[field.name]) ? defaultFormValues[field.name] : field.value;
        }
      } else {
        allFormValues[field.name] = '';
      }
      if (field.type === 'addmore') {
        if (!resetForm) {
          if (formValues[field.name]) {
            allFormValues[field.name] = formValues[field.name];
          } else {
            allFormValues[field.name] = (typeof allFormValues[field.name] === 'object') ? allFormValues[field.name] : [];
          }
          const amFields = allFormValues[field.name] && (typeof allFormValues[field.name] === 'object') ? allFormValues[field.name] : [];
          // addMoreFields[field.name] = [field.fields];
          addMoreFields[field.name] = Array(amFields.length || 1).fill(field.fields);
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
  }, [defaultFormValues]);

  const updateFormValues = (e, field, fieldIndex = 0, aField = {}) => {
    if (!CustomFunctions.checkIfEmpty(callbacks, 'O')) {
      if (callbacks[field.callback]) callbacks[field.callback](e);
    }
    const allValues = formValues;
    if (field.type === 'addmore') {
      let fieldValues = formValues[field.name];
      if (!fieldValues) fieldValues = [];
      if (!fieldValues[fieldIndex]) fieldValues[fieldIndex] = {};
      fieldValues[fieldIndex][aField.name] = aField.type === 'date' ? e ? new Date(e) : null : e;
      allValues[field.name] = fieldValues;
    } else {
      allValues[field.name] = field.type === 'date' ? e ? new Date(e) : null : e;
    }
    if (!CustomFunctions.checkIfEmpty(field.fieldsToReset, 'A')) {
      field.fieldsToReset.map((f) => {
        allValues[f] = null;
        return f;
      });
    }
    const forceUpdateFields = ['date', 'select', 'radio', 'checkbox'];
    setFormValues(forceUpdateFields.includes(aField.type || field.type) ? { ...allValues } : allValues);
  };

  const getFieldType = (fieldName = '') => {
    const selectedField = allFormFields.filter(field => field.name === fieldName);
    if (CustomFunctions.checkIfEmpty(selectedField, 'A')) return '';
    return { type: selectedField[0].type, isMulti: selectedField[0].isMulti };

  };

  const checkFieldCondition = (condition) => {
    const fieldType = getFieldType(condition.name);
    let conditionResults = true;
    let checkboxValue = [];
    let dropdownValue = fieldType.isMulti ? [] : {};

    if (fieldType.type === 'checkbox') {
      checkboxValue = CustomFunctions.checkIfEmpty(formValues[condition.name], 'A') ? [] : formValues[condition.name];
    }

    if (fieldType.type === 'select') {
      dropdownValue = CustomFunctions.checkIfEmpty(formValues[condition.name]) ? dropdownValue : formValues[condition.name];
    }

    switch (condition.condition) {
      case '===':
      case '==':
        if (fieldType.type === 'text') {
          console.log('condition', condition);
          console.log('condition.condition', condition.condition);
          console.log('condition.value', condition.value);
          console.log('formValues', formValues);
          console.log('fieldType', fieldType);
          console.log('formValues[condition.name]', formValues[condition.name]);
          console.log('condition.value', condition.value);
          console.log('formValues[condition.value]', formValues[condition.value]);
          console.log('conditionResults', formValues[condition.name] === condition.value);

          conditionResults = formValues[condition.name] === condition.value;
          break;
        }
        if (fieldType.type === 'checkbox') {
          conditionResults = checkboxValue.includes(condition.value);
          break;
        }
        if (fieldType.type === 'select') {
          if (fieldType.isMulti) {
            const values = [...dropdownValue].map(v => v.value);
            conditionResults = values.includes(condition.value);
            break;
          }
          conditionResults = dropdownValue.value === condition.value;
          break;
        }
        conditionResults = formValues[condition.name] === condition.value;
        break;
      case '!=':
        if (fieldType === 'checkbox') {
          conditionResults = !checkboxValue.includes(condition.value);
          break
        }
        if (fieldType.type === 'select') {
          if (fieldType.isMulti) {
            const values = [...dropdownValue].map(v => v.value);
            conditionResults = !values.includes(condition.value);
            break;
          }
          conditionResults = dropdownValue.value !== condition.value;
          break;
        }
        conditionResults = formValues[condition.name] != condition.value;
        break;
      case '>=': conditionResults = formValues[condition.name] >= condition.value; break;
      case '>': conditionResults = formValues[condition.name] > condition.value; break;
      case '<': conditionResults = formValues[condition.name] < condition.value; break;
      case '<=': conditionResults = formValues[condition.name] <= condition.value; break;
      case '!empty': conditionResults = !CustomFunctions.checkIfEmpty(formValues[condition.name]); break;
      case 'empty': conditionResults = CustomFunctions.checkIfEmpty(formValues[condition.name]); break;
      default: conditionResults = true; break;
    }
    return conditionResults;
  };

  const checkPermittedUser = (allowedUsers = []) => {
    if (!currentUser || !allowedUsers || !allowedUsers.length) return true;
    return allowedUsers.includes(Number(currentUser));
  };

  const checkDisplayConditions = (field) => {
    if (CustomFunctions.checkIfEmpty(field.displayWhen, 'O')) return true;
    if (CustomFunctions.checkIfEmpty(field.displayWhen.conditions, 'A')) return true;

    const conditionResults = [];
    let displayField = true;
    field.displayWhen.conditions.map((condition) => {
      conditionResults.push(checkFieldCondition(condition));
      return condition;
    });

    // Get all satisfied conditions
    const filteredResult = conditionResults.filter(condition => condition);

    switch (CustomFunctions.toLowerCase(field.displayWhen.displayWhenRelation)) {
      case 'and':
        if (filteredResult.length !== conditionResults.length) displayField = false;
        break;
      case 'or':
        if (!filteredResult.length) displayField = false;
        break;
      default: displayField = true;
    }
    return displayField;
  }

  const getFieldValidation = (field, isAddMore = false, fieldIndex = 0, parentField = {}) => {
    console.log('field', field);
    if (CustomFunctions.checkIfEmpty(field.validations, 'A')) return '';
    let validations = '';
    field.validations.map((item) => {
      // If applywhen condition is empty
      if (CustomFunctions.checkIfEmpty(item.applyWhen, 'A')) {
        if (item.type) validations = `${validations}${validations ? '|' : ''}${item.type}`;
        return item;
      }

      // If applywhen has some conditions
      const conditionResults = [];
      item.applyWhen.map((condition) => {
        conditionResults.push(checkFieldCondition(condition));
        return condition;
      });

      // Get all satisfied conditions
      const filteredResult = conditionResults.filter(condition => condition);

      switch (CustomFunctions.toLowerCase(item.applyWhenRelation)) {
        case 'and':
          if (filteredResult.length !== conditionResults.length) return item;
          break;
        case 'or':
          if (!filteredResult.length) return item;
          break;
        default: return item;
      }

      if (item.type) validations = `${validations}${validations ? '|' : ''}${item.type}`;
      return item;
    });

    if (!validations) return '';
    let defaultValue = formValues[field.name];
    if (isAddMore) {
      const fVal = CustomFunctions.checkIfEmpty(formValues[parentField.name], 'A') ? [] : formValues[parentField.name];
      if (!fVal[fieldIndex]) fVal[fieldIndex] = {};
      const val = fVal[fieldIndex][field.name];
      defaultValue = field.type === 'date' ? val ? new Date(val) : null : val; //fVal[fieldIndex][field.name];
    }
    return simpleValidator.current.message(field.label, defaultValue, validations);
  };

  const RenderSectionTitle = ({ title }) => {
    return (
      <>
        <div className={``}>
          <h5>{title}</h5>
        </div>
        <hr />
      </>
    )
  };

  const getFieldLayout = (layout = '1column') => {
    let columns = 1;
    switch (layout) {
      case '1column': columns = 1; break;
      case '2column': columns = 2; break;
      case '3column': columns = 3; break;
      case '4column': columns = 4; break;
      default: columns = 1;
    };
    return columns;
  };

  const RenderFormField = ({ field, onChange, isAddMore, fieldIndex, parentField }) => {
    const extraProps = {};
    if (field.minDateSelector) extraProps.minDate = formValues[field.minDateSelector];
    if (field.maxDateSelector) extraProps.maxDate = formValues[field.maxDateSelector];
    if (field.type === 'date') extraProps.selected = formValues[field.name];
    // if (field.type === 'select') {
    //   extraProps.options = options[field.name] ? dropdownOptions[field.name] : field.options;
    // }
    if (['select', 'checkbox'].includes(field.type)) {
      extraProps.options = options[field.name] ? options[field.name] : field.options;
    }

    if (['checkbox', 'radio'].includes(field.type)) {
      extraProps.name = `${field.name}[${fieldIndex}]`;
    }

    let defaultValue = formValues[field.name];
    if (isAddMore) {
      const fVal = CustomFunctions.checkIfEmpty(formValues[parentField.name], 'A') ? [] : formValues[parentField.name];
      if (!fVal[fieldIndex]) fVal[fieldIndex] = {};
      if (field.type === 'date') extraProps.selected = fVal[fieldIndex][field.name];
      if (field.minDateSelector) extraProps.minDate = fVal[fieldIndex][field.minDateSelector];
      if (field.maxDateSelector) extraProps.maxDate = fVal[fieldIndex][field.maxDateSelector];
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
            errorMessage: getFieldValidation(field, isAddMore, fieldIndex, parentField)
          }}
        />
      </>
    );
  };

  const addField = (field) => {
    const fields = allAddMoreFields[field.name];
    const foundFields = allFormFields.filter(f => f.type === 'addmore' && f.name === field.name);
    const fieldsToAdd = CustomFunctions.checkIfEmpty(foundFields, 'A') ? [] : foundFields[0].fields;
    fields.push(fieldsToAdd);
    setAddMoreFields({
      ...allAddMoreFields,
      [field.name]: fields
    });
  };

  const removeField = (field, fieldIndex) => {
    const fields = allAddMoreFields[field.name];
    fields.splice(fieldIndex, 1);
    const allVals = formValues;
    const fVal = CustomFunctions.checkIfEmpty(allVals[field.name], 'A') ? [] : allVals[field.name];
    if (fVal.length) fVal.splice(fieldIndex, 1);
    allVals[field.name] = fVal;
    setFormValues(allVals);
    setAddMoreFields({
      ...allAddMoreFields,
      [field.name]: fields
    });
  };

  const RenderSingleFormField = ({ field, columns }) => {
    const displayField = checkDisplayConditions(field);
    const isPermittedUser = checkPermittedUser(field.allowedUsers);
    const allDisplayFields = displayedFields;
    allDisplayFields[field.name] = displayField;
    updateDisplayedFields(allDisplayFields);
    if (!displayField || !isPermittedUser) return <></>;
    const col = 12 / Number(columns);
    const isAddMoreField = field.type === 'addmore';
    const addMoreFields = isAddMoreField ? allAddMoreFields[field.name] : [];
    const fieldCol = isAddMoreField ? 12 / getFieldLayout(field.fieldLayout) : col;
    return (
      <>
        <Col md={col}>
          {
            isAddMoreField ? (
              <Row className={field.sectionClass}>
                <Form.Label>{field.label}</Form.Label>
                {
                  addMoreFields.map((aField, fieldIndex) => {
                    return (
                      <>
                        {
                          aField.map((bField) => (
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
                          ))
                        }
                        <Col md={12} className="mb-3">
                          <div className="btn-group addMoreBtnContainer">
                            <Button
                              className="btn btn-primary btn-width mr-5"
                              onClick={() => addField(field)}
                            >+</Button>
                            <Button
                              className="btn btn-secondary btn-width"
                              onClick={() => removeField(field, fieldIndex)}
                            >-</Button>
                          </div>
                        </Col>
                      </>
                    );
                  })
                }
              </Row>
            ) : (
              <RenderFormField
                field={{ ...field }}
                column={col}
                onChange={(e) => {
                  updateFormValues(e, field);
                }}
              />
            )
          }
        </Col>
      </>
    );
  }

  const RenderSection = ({ section }) => {
    const { displaySection, sectionTitle, displaySectionTitle, fields, sectionLayout, containerClass } = section;
    const isPermittedUser = checkPermittedUser(section.allowedUsers);
    if (!displaySection || !isPermittedUser) return <></>;
    let columns = getFieldLayout(sectionLayout);

    return (
      <>
        <div className={containerClass}>
          {displaySectionTitle && <RenderSectionTitle title={sectionTitle} />}
          <Row>
            {
              fields.map((field, fieldIndex) => (
                <>
                  <RenderSingleFormField field={field} columns={columns} />
                  {/* <RenderFormField
                    field={{ ...field }}
                    column={columns}
                    onChange={(e) => {
                      updateFormValues(e, field);
                    }}
                  /> */}
                </>
              ))
            }
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
    if (onFormSubmit) onFormSubmit(finalFormValues);
  };

  useEffect(() => {
    if (!submitCount) return;
    validateAndSubmitForm();
  }, [submitCount]);

  const submitForm = (e) => {
    e.preventDefault();
    updateSubmitCount(submitCount + 1);
  };

  const resetForm = (e) => {
    e.preventDefault();
    if (simpleValidator && simpleValidator.current) simpleValidator.current.hideMessages();
    setDefaultFormValues(true);
    if (onFormReset) onFormReset();
  };

  const getStepLabels = (allSections) => {
    if (CustomFunctions.checkIfEmpty(allSections, 'A')) return [];
    const stepProps = stepperProps.steps || {};
    const steps = allSections.map(section => {
      const label = stepProps[section.sectionName] && stepProps[section.sectionName].label ? stepProps[section.sectionName].label : section.sectionTitle;
      const image = stepProps[section.sectionName] && stepProps[section.sectionName].image ? stepProps[section.sectionName].image : null;
      return {
        title: label,
        icon: image
      };
    });
    return steps;
  };

  const nextPrevCallback = (next = true) => {
    updateIsClickedNext(next);
    updateStepCounter(stepCounter + 1);
  };

  const changeStep = (next = true) => {
    if (next) {
      if (!simpleValidator.current.allValid()) {
        simpleValidator.current.showMessages();
        setFormValues({ ...formValues });
        return;
      }
      simpleValidator.current.hideMessages();
      if (currentStepIndex + 1 > allFormSections.length - 1) return;
      updateStepIndex(currentStepIndex + 1);
    } else {
      if (currentStepIndex - 1 < 0) return;
      updateStepIndex(currentStepIndex - 1);
    }
  };

  useEffect(() => {
    if (!stepCounter) return;
    changeStep(isClickedNext);
  }, [stepCounter]);

  simpleValidator.current.purgeFields();
  return (
    <>
      <Form onSubmit={submitForm} onReset={resetForm}>
        {
          isStepForm && (
            <div className={stepperProps.containerClass}>
              <Stepper steps={getStepLabels(allFormSections)} activeStep={currentStepIndex} />
            </div>
          )
        }
        {
          allFormSections && allFormSections.map((section, secIndex) => {
            return (
              <React.Fragment key={secIndex}>
                {
                  ((isStepForm && secIndex === currentStepIndex) || !isStepForm) && (
                    <RenderSection section={section} />
                  )
                }
              </React.Fragment>
            )
          })
        }
        <div className={`btn-group mt-5 ${btnContainerClass}`}>
          {
            isStepForm ? (
              <>
                <Button
                  variant="secondary"
                  className="mr-5 prev-btn"
                  onClick={() => {
                    nextPrevCallback(false);
                  }}
                >
                  {`${stepperProps.prevBtnText || 'Prev'}`}
                </Button>
                <Button
                  variant="primary"
                  className="next-btn"
                  onClick={(e) => {
                    if (currentStepIndex < allFormSections.length - 1)
                      nextPrevCallback(true);
                    else
                      submitForm(e);
                  }}
                >
                  {
                    currentStepIndex < allFormSections.length - 1 ? `${stepperProps.nextBtnText || 'Next'}` : `${submitBtnText || 'Submit'}`
                  }
                </Button>
              </>
            ) : (
              <>
                <Button variant="primary" className="mr-5" type="submit">{`${submitBtnText || 'Submit'}`}</Button>
                {
                  showResetBtn && (
                    <Button variant="secondary" type="reset">{`${resetBtnText || 'Reset'}`}</Button>
                  )
                }
              </>
            )
          }
        </div>
      </Form>
    </>
  );
}
