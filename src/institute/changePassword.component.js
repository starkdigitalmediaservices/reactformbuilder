import React, { useState, useEffect } from 'react';
import StarkFormBuilder from '../components/StarkFormBuilder';
import FormSections from './passwordFormschema.json';
import { Card } from 'react-bootstrap';
import AuthApi from '../components/StarkFormBuilder/helper/authApi';
import Api from '../components/StarkFormBuilder/helper/api';
import Breadcrumb from '../components/Breadcrumb/breadcrumb.component';

const ChangePasswordComponent = () => {

  // Variable declarations
  const [defaultValues, updateDefaultValues] = useState({});
  const [options, updateOptions] = useState({});
  const [currentUser, updateCurrentUser] = useState(0);
  
  const title = 'All Institutes';
  const items = [
    { to: '/', label: 'Home' },
    { to: '/institute/list', label: 'All Institute' },
  ];

  // Get user role
  const getUserRole = async() => {
    const roleId = await localStorage.getItem('role');
    updateCurrentUser(Number(roleId));
  };

  useEffect(() => {
    getUserRole();
  }, []);

  // Submit Form
  const submitForm = async (formValues) => {
    console.log(formValues);
    
      const { data } = await AuthApi.postDataToServer(Api.changePassword, formValues);
      if(!data) {
        // show error
        return;
      }
      // Perform success actions
      
  };

  return (
    <>
      <div className="page-header">
        <div className="title-breadcrumb-section">
          <h2 className="main-content-title tx-24 mg-b-5">{title}</h2>
          <Breadcrumb items={items} />
        </div>
      </div>
      <Card className="mt-1">
        
  <StarkFormBuilder
    containerClass=''
    formHeaderClass=''
    formSections={FormSections}
    formHeading="Change Password"
    onFormSubmit={(formValues) => {submitForm(formValues);}}
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
      console.log('form reset callback')
    }}
  />
    

      </Card>
    </>
  );
};

export default ChangePasswordComponent;
