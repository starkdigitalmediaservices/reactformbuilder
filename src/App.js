/* eslint-disable */
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import FormBuilder from './components/StarkFormBuilder';
import FormSections from './components/StarkFormBuilder/sample.json';
import axios from 'axios';
let formOptions = {}

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

  const getStocks = async () => {
    axios.get('https://jsonplaceholder.typicode.com/users/').then(res => {
      console.log('res', res);
      const data = res.data;
      const dpOptions = [];
      data.map((op) => {
        // Change appropriate keys
        dpOptions.push({ label: op.name, value: op.id });
        return op;
      });
      const allOptions = {
        ...formOptions,
        ...options,
        stock: dpOptions
      };
      formOptions = { ...allOptions };
      updateOptions(allOptions);
    })
  }

  useEffect(() => {
    getStocks();
  }, []);

  const getUsers = async () => {
    axios.get('https://jsonplaceholder.typicode.com/users/').then(res => {
      console.log('res', res);
      const data = res.data;
      const dpOptions = [];
      data.map((op) => {
        // Change appropriate keys
        dpOptions.push({ label: op.name, value: op.id });
        return op;
      });
      const allOptions = {
        ...formOptions,
        ...options,
        users: dpOptions
      };
      formOptions = { ...allOptions };
      updateOptions(allOptions);
    })
  }

  useEffect(() => {
    getUsers();
  }, []);

  const getClasses = async () => {
    axios.get('https://jsonplaceholder.typicode.com/users/').then(res => {
      console.log('res', res);
      const data = res.data;
      const dpOptions = [];
      data.map((op) => {
        // Change appropriate keys
        dpOptions.push({ label: op.name, value: op.id });
        return op;
      });
      const allOptions = {
        ...formOptions,
        ...options,
        country: dpOptions
      };
      formOptions = { ...allOptions };
      updateOptions(allOptions);
    })
  }

  const getStates = (val) => {
    axios.get('https://jsonplaceholder.typicode.com/users/').then(res => {
      console.log('res', res);
      const data = res.data;
      const dpOptions = [];
      data.map((op) => {
        // Change appropriate keys
        dpOptions.push({ label: op.name, value: op.id });
        return op;
      });
      const allOptions = {
        ...formOptions,
        ...options,
        state: dpOptions
      };
      formOptions = { ...allOptions };
      updateOptions(allOptions);
      updateDefaultValues({
        state: null
      })
    })
  };

  useEffect(() => {
    getClasses();
  }, []);

  return (
    <Card className="App">
      <Card.Body>
        <FormBuilder
          containerClass=''
          formClass=''
          formHeaderClass=''
          formSections={FormSections}
          formHeading="Registration"
          onFormSubmit={(formValues) => { console.log('234234'); submitForm(formValues); }}
          options={options}
          callbacks={{
            onCountryChange: (val) => { console.log('val', val); getStates(val); }
          }}
          defaultFormValues={defaultValues}
          currentUser={currentUser}
          submitBtnText=""
          showBtnClass={true}
          showResetBtn
          resetBtnText="Clear"
          btnContainerClass="form-submit-buttons"
          onFormReset={() => {
            console.log('form reset callback')
          }}
          // isStepForm
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
