import React, { useState, useEffect } from 'react';
import StarkFormBuilder from '../components/StarkFormBuilder';
import swal from 'sweetalert';
import { Card } from 'react-bootstrap';
import FormSections from './addinstituteformschema.json';
import AuthApi from '../components/StarkFormBuilder/helper/authApi';
import Api from '../components/StarkFormBuilder/helper/api';
// import customFunctions from '../../helper/customFunctions';
import ModalInput from '../components/Modal/modal.component';

const AddNewInstitutecomponent = (props) => {
  console.log('props', props);
  const { instituteId } = props;
  const [defaultValues, updateDefaultValues] = useState({});
  const options = {};
  const [currentUser, updateCurrentUser] = useState(0);
  const [taskModalShow, setTaskModalShow] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [instaId, setInstaId] = useState(null);
  const [count, forceUpdate] = useState(0);

  const getUserRole = async () => {
    const roleId = await localStorage.getItem('role');
    updateCurrentUser(Number(roleId));
  };

  useEffect(() => {
    getUserRole();
  }, []);

  useEffect(() => {
    setTaskModalShow(props.show);
    setInstaId(instituteId);
  }, [instituteId]);

  console.log('instituteId', instituteId);

  // Submit Form
  const submitForm = async (formValues) => {
    const payload = {
      name: formValues.name,
    }
    if (instaId) payload.id = instaId;
    const callback = instaId ? AuthApi.putDataToServer : AuthApi.postDataToServer;
    const endPoint = instaId ? Api.updateInstitute : Api.addInstitute;

    const { data } = await callback(endPoint, payload);

    if (!data) {
      swal(data.data.message, '', 'error')
    }

    props.handleModalCLose(false);
    swal(data.data.message, '', 'success').then(async (result) => {
      if (result) {
        setDisableButton(false);
        await setInstaId(null);
        forceUpdate(count + 1);
        props.onChanges();
        props.handleModalCLose(false);
      }
    });
  };

  const onTaskCancel = async () => {
    await setInstaId(null);
    setTaskModalShow(false);
    if (disableButton) return;
    setDisableButton(true);
    forceUpdate(count + 1);
    props.handleModalCLose(false);
  };

  // Get data for form
  const getData = async () => {
    await updateDefaultValues({});
    const { data } = await AuthApi.getDataFromServer(`${Api.getInstituteById}?id=${instaId}`);
    if (!data) {
      // show error
      return;
    }
    updateDefaultValues(data.data);
  };

  // Call get data method on load
  useEffect(() => {
    getData();
  }, [instaId]);

  console.log('count', count);

  return (
    <>
      <Card>
        <Card.Body>
       
              <StarkFormBuilder
                containerClass='addInstitute'
                formHeaderClass=''
                formSections={FormSections}
                formHeading='Add Institute'
                onFormSubmit={(formValues) => {
                  submitForm(formValues);
                }}
                options={options}
                callbacks={{}}
                refreshCounter={count}
                defaultFormValues={defaultValues}
                currentUser={currentUser}
                submitBtnText='Submit'
                showResetBtn={false}
                resetBtnText='Clear'
                btnContainerClass='form-submit-buttons'
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

export default AddNewInstitutecomponent;
