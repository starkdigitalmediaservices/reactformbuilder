import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import StarkFormBuilder from '../components/StarkFormBuilder';
import FormSections from './addmoreformschema.json';
import AuthApi from '../components/StarkFormBuilder/helper/authApi';
import Api from '../components/StarkFormBuilder/helper/api';;

let filterOptions ={};

const AddMoreFormComponent = () => {
  // Variable declarations
  const [defaultValues, updateDefaultValues] = useState({});
  const [options, updateOptions] = useState({});
  const [currentUser, updateCurrentUser] = useState(0);

  // Get user role
  const getUserRole = async () => {
    const roleId = await localStorage.getItem('role');
    updateCurrentUser(Number(roleId));
  };

  useEffect(() => {
    getUserRole();
  }, []);

  // Submit Form
  const submitForm = async (formValues) => {
    console.log(formValues);

    const { data } = await AuthApi.postDataToServer(
      Api.getTutorClassSubjectByUrl,
      formValues
    );
    if (!data) {
      // show error
      // return;
    }
    // Perform success actions
  };

  // Get data for form
  const getData = async () => {
    const { data } = await AuthApi.getDataFromServer(
      Api.getTutorClassSubjectByUrl
    );
    if (!data) {
      // show error
      return;
    }
    updateDefaultValues(data);
  };

  // Call get data method on load
  useEffect(() => {
    getData();
  }, []);

  const getClassList = async () => {
    const { data } = await AuthApi.getDataFromServer(Api.schoolYearUrl);
    if (!data) {
      // show error
      return;
    }

    const dpOptions = [];
    data.data.map((op) => {
      // Change appropriate keys
      dpOptions.push({ label: op.name, value: op.id });
      return op;
    });
    const allOptions = {
      ...options,
      ...filterOptions,
      classes: dpOptions,
    };
    filterOptions = {...allOptions};
    updateOptions(allOptions);
  };

  useEffect(() => {
    getClassList();
  }, []);

  const getSubjectList = async () => {
    const { data } = await AuthApi.getDataFromServer(Api.subjectUrl);
    if (!data) {
      // show error
      return;
    }

    const dpOptions = [];
    data.data.map((op) => {
      // Change appropriate keys
      dpOptions.push({ label: op.name, value: op.id });
      return op;
    });
    const allOptions = {
      ...options,
      ...filterOptions,
      subject: dpOptions,
    };
    filterOptions = {...allOptions};
    updateOptions(allOptions);
  };

  useEffect(() => {
    getSubjectList();
  }, []);

  return (
    <>
      <Card className="mt-2">
        <Card.Body>
          <StarkFormBuilder
            containerClass=""
            formHeaderClass=""
            formSections={FormSections}
            formHeading="Add More"
            onFormSubmit={(formValues) => {
              submitForm(formValues);
            }}
            options={options}
            callbacks={{}}
            defaultFormValues={defaultValues}
            currentUser={currentUser}
            submitBtnText="Submit"
            showResetBtn={false}
            resetBtnText="Clear"
            btnContainerClass="form-submit-buttons"
            isStepForm={false}
            onFormReset={() => {
              console.log('form reset callback');
            }}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default withRouter(AddMoreFormComponent);
