/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import StarkFormBuilder from "./components/StarkFormBuilder";
// import StarkFormBuilder from "stark-form-builder-updated"
import FormSections from "./components/StarkFormBuilder/sample.json";
import Schema from "./components/StarkFormBuilder/addMoreFormSchema.json"; // Add more
import conditionalSchema from "./components/StarkFormBuilder/conditionalBasedFormSchema.json";
import FormSchema05 from "./components/StarkFormBuilder/FormSchema05.json";
import newFormSchema from "./components/StarkFormBuilder/newFormSchema.json";
import axios from "axios";
import dummyjson from './components/StarkFormBuilder/dummyschema.json';

let formOptions = {};

function App() {
  // Variable declarations
  const [defaultValues, updateDefaultValues] = useState({});
  const [updatedValues, setUpdateFormValues] = useState([]);
  const [options, updateOptions] = useState({});
  const [currentUser, updateCurrentUser] = useState(0);
  const [runtimeFormValues,setRunTimeFormValues]= useState({})
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

    // const { data } = await AuthApi.postDataToServer(Api.addStudent, formValues);
    // if (!data) {
    //   // show error
    //   return;
    // }
    // // Perform success actions
  };

  const getStocks = async () => {
    axios.get("https://jsonplaceholder.typicode.com/users/").then((res) => {
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

  const getCountries = async () => {
    axios.get("https://countriesnow.space/api/v0.1/countries").then((res) => {
      const data = res.data?.data;
      const dpOptions = [];
      data.map((op) => {
        // Change appropriate keys
        dpOptions.push({ label: op.country, value: op.country });
        return op;
      });
      const allOptions = {
        ...formOptions,
        ...options,
        country: dpOptions,
        state: {
          label: null,
          value: null
        },
        city: {
          label: null,
          value: null
        }
      };
      formOptions = { ...allOptions };
      // console.log("def", defaultValues);
      updateOptions(allOptions);
    });
  };

  const getstates = (val) => {
    axios.post("https://countriesnow.space/api/v0.1/countries/states", { country: val?.value }).then((res) => {
      const data = res.data?.data?.states;
      const dpOptions = [];
      data.map((op) => {
        // Change appropriate keys
        dpOptions.push({ label: op.name, value: op.name });
        return op;
      });
      const allOptions = {
        ...formOptions,
        ...options,
        state: dpOptions,
        city: []
      };
      formOptions = { ...allOptions };
      updateOptions(allOptions);
      setUpdateFormValues(["state", "city"]);
      // updateDefaultValues({
      //   ...defaultValues,
      //   city: null,
      // });
    });
  };


  const getCities = async (val) => {

    if (!runtimeFormValues?.country?.value && !runtimeFormValues?.state?.value ){
        return
    }
    const payload = {
      country: runtimeFormValues?.country?.value,
      state: val?.value,
    };
  
    try {
      const {data} = await axios.post("https://countriesnow.space/api/v0.1/countries/state/cities", payload);
      const dpOptions = [];
      data?.data?.map((op) => {
        // Change appropriate keys
        dpOptions?.push({ label: op, value: op });
        return op;
      });
      const allOptions = {
        ...formOptions,
        ...options,
        city: dpOptions
      };
      formOptions = { ...allOptions };
      updateOptions(allOptions);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    getCountries();
    getCities()
  }, []);



  const addMoreButtonsSchema = [{
    "label":"external link",
    "type":"link",
    "name": "test no",
    "variant":"link",
    "className":"mb-6",
    "href":"https://www.npmjs.com/",
    "target":"_blank",
    "disable":"true",
    "onClick":()=>console.log("laxi")
  },      {
    "label":"external link 2",
    "type":"link",
    "name": "test yes",
    "variant":"link",
    "className":"mb-6",
    "href":"https://www.npmjs.com/",
    "target":"_blank",
    "disable":"true",
    "onClick":()=>console.log("shweta")
  }] 

  return (
    <Card className="App">
      <Card.Body>
        <StarkFormBuilder
          containerClass=""
          formClass=""
          formHeaderClass=""
          formSections={/* FormSections */ /* Schema */ dummyjson /* FormSchema05 *//* newFormSchema */}
          // formSections={conditionalSchema}
          formHeading="Registration"
          onTextInputChange={(value, formValues) => {
            //  updateDefaultValues(formValues)
            setRunTimeFormValues(formValues)
          }} // runtime onchange values and formValues
          onFormSubmit={(formValues) => {
            submitForm(formValues);
          }}
          onFormDraft={(formValues) => {
            submitForm(formValues);
          }}
          options={options}
          removeValues={updatedValues}
          callbacks={{  
            onCountryChange: (val) => {
              getstates(val);
            },
            onStateChange: (val) => {
              getCities(val);
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
          sectionButtonCallBacks={[
            () => window.open('https://www.google.com', '_blank'),
            () => console.log('Button 2 clicked'),
            () => console.log('Button 3 clicked'),
            () => console.log('Button 4 clicked'),
          ]}
          addMoreButtonsSchema={addMoreButtonsSchema}
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
          getFormValues={(formValues) => {
            console.log()
          }}
        />
      </Card.Body>
    </Card>
  );
}

export default App;