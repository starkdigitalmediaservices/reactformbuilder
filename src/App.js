/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import StarkFormBuilder from "./components/StarkFormBuilder";
// import StarkFormBuilder from "stark-form-builder-updated"
import FormSections from "./components/StarkFormBuilder/sample.json";
import Schema from "./components/StarkFormBuilder/addMoreFormSchema.json"; // Add more
import conditionalSchema from "./components/StarkFormBuilder/conditionalBasedFormSchema.json";
import axios from "axios";
let formOptions = {};

function App() {
  // Variable declarations
  const [defaultValues, updateDefaultValues] = useState({});
  console.log("🚀 ~ App ~ defaultValues:", defaultValues);
  const [options, updateOptions] = useState({});
  console.log("🚀 ~ App ~ options:", options);
  const [currentUser, updateCurrentUser] = useState(0);
  const step = [{}];
  // Get user role
  const getUserRole = async () => {
    const roleId = await localStorage.getItem("role");
    updateCurrentUser(Number(roleId));
  };

  useEffect(() => {
    getUserRole();
  }, []);

  // Submit Form
  const submitForm = async (formValues) => {
    console.log("formValues 123", formValues);

    // const { data } = await AuthApi.postDataToServer(Api.addStudent, formValues);
    // if (!data) {
    //   // show error
    //   return;
    // }
    // // Perform success actions
  };

  const getStocks = async () => {
    axios.get("https://jsonplaceholder.typicode.com/users/").then((res) => {
      console.log("res", res);
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
        stock: dpOptions,
      };
      formOptions = { ...allOptions };
      updateOptions(allOptions);
    });
  };

  useEffect(() => {
    getStocks();
  }, []);

  const getUsers = async () => {
    axios.get("https://jsonplaceholder.typicode.com/users/").then((res) => {
      console.log("res", res);
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
        users: dpOptions,
      };
      formOptions = { ...allOptions };
      updateOptions(allOptions);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getClasses = async () => {
    axios.get("https://jsonplaceholder.typicode.com/users/").then((res) => {
      console.log("res", res);
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
        country: dpOptions,
      };
      formOptions = { ...allOptions };
      updateOptions(allOptions);
    });
  };

  const getStates = (val) => {
    axios.get("https://jsonplaceholder.typicode.com/users/").then((res) => {
      console.log("res", res);
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
        state: dpOptions,
      };
      formOptions = { ...allOptions };
      updateOptions(allOptions);
      updateDefaultValues({
        state: null,
      });
    });
  };

  useEffect(() => {
    getClasses();
  }, []);

  return (
    <Card className="App">
      <Card.Body>
        <StarkFormBuilder
          containerClass=""
          formClass=""
          formHeaderClass=""
          formSections={/* FormSections */ Schema}
          // formSections={conditionalSchema}
          formHeading="Registration"
          onFormSubmit={(formValues) => {
            console.log("234234");
            submitForm(formValues);
          }}
          onFormDraft={(formValues) => {
            console.log("234234");
            submitForm(formValues);
          }}
          options={options}
          callbacks={{
            onCountryChange: (val) => {
              console.log("val", val);
              getStates(val);
            },
          }}
          defaultFormValues={defaultValues}
          currentUser={currentUser}
          submitBtnText=""
          showBtnClass={true}
          showResetBtn
          showDraftBtn
          resetBtnText="Reset"
          btnContainerClass="form-submit-buttons"
          onFormReset={() => {
            console.log("form reset callback");
          }}
          // isStepForm
          stepFormProps={{
            steps: {
              userinfo: {
                label: "first",
              },
              userdetails: {
                label: "sectond",
              },
            },
            containerClass: "stark-stepper-container",
            nextBtnText: "",
            prevBtnText: "",
          }}
          addMoreRemoveCallback={(index) => {
            console.log("Add more field removed callback", index);
          }}
          addMoreAddCallback={() => {
            console.log("Add more field add callback");
          }}
        />
      </Card.Body>
    </Card>
  );
}

export default App;
