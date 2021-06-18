/* eslint-disable */
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import FormBuilder from './components/StarkFormBuilder';
import FormSections from './components/StarkFormBuilder/sample.json';

function App() {
  // Variable declarations
  const [defaultValues, updateDefaultValues] = useState({});
  const [options, updateOptions] = useState({});
  const [currentUser, updateCurrentUser] = useState(0);
  const step = [{

  }]
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
    console.log('formValues 123', formValues);

    // const { data } = await AuthApi.postDataToServer(Api.addStudent, formValues);
    // if (!data) {
    //   // show error
    //   return;
    // }
    // // Perform success actions

  };

  const getClasses = async () => {
    // const { data } = await AuthApi.getDataFromServer(Api.classesUrl);
    // if (!data) {
    //   // show error
    //   return;
    // }

    // const dpOptions = [];
    // data.data.map((op) => {
    //   // Change appropriate keys
    //   dpOptions.push({ label: op.name, value: op.id });
    //   return op;
    // });
    // const allOptions = {
    //   ...options,
    //   classes: dpOptions
    // };
    // updateOptions(allOptions);
  }

  useEffect(() => {
    getClasses();
  }, []);

  return (
    <Card className="App">
      <Card.Body>
        <FormBuilder
          containerClass=''
          formHeaderClass=''
          formSections={FormSections}
          formHeading="Registration"
          onFormSubmit={(formValues) => { console.log('234234'); submitForm(formValues); }}
          options={options}
          callbacks={{}}
          defaultFormValues={defaultValues}
          currentUser={currentUser}
          submitBtnText=""
          showResetBtn
          resetBtnText="Clear"
          btnContainerClass="form-submit-buttons"
          onFormReset={() => {
            console.log('form reset callback')
          }}
          isStepForm
          stepFormProps={{
            steps: {
              userinfo: {
                label: 'first'
              },
              userdetails: {
                label: 'sectond'
              }
            },
            containerClass: 'stark-stepper-container',
            nextBtnText: '',
            prevBtnText: ''
          }}
        />
      </Card.Body>
    </Card>
  );
}

export default App;
