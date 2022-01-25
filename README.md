# React Form Builder

Package to create form using JSON schema


## Installation

Install react form builder

```
npm i --save stark-form-builder
```

## Dependencies

Install dependent libraries
* bootstratp
* react-bootstrap
* react-select
* react-datepicker
* simple-react-validator
* react-stepper-horizontal

```
npm i --save bootstrap react-bootstrap react-select react-datepicker simple-react-validator react-stepper-horizontal
```

## Usage

Import this in your screen/component.

```
import FormBuilder from 'reactformbuilder';
import FormSchema from './formschema.json';
```


Use this in render / return


```
// some code


render() {
    return (
        <FormBuilder
            containerClass=''
            formHeaderClass=''
            formHeading="Registration"
            formSections={FormSchema}
            onFormSubmit={(formValues) => { console.log(formValues); }}
            options={options}
            callbacks={{}}
            defaultFormValues={defaultValues}
            currentUser={currentUser}
            submitBtnText="Submit"
            showResetBtn
            resetBtnText="Clear"
            btnContainerClass=""
            onFormReset={() => { console.log('form reset callback); }}
        />
    );
}

```


### Configurable props

* containerClass - Class for form container
* formHeaderClass - Class for form heading
* formHeading - Heading for form
* formSections - JSON form schema for form
* onFormSubmit - Callback for form submission, gives all form filled values
* options - Pass options dynamically to Select box and Checkboxes
  ```
  options: {{
      subjects: [{value: 'maths', label: 'Maths'}, {value: 'chem', label: 'Chemistry'}],
  }}
  ```
  NOTE: Key must be same as input value, then only it'll patch the values

* callbacks - On change callbacks for input type select change
  ```
  callbacks: {{
      callback1: (value) => { console.log(value); }
  }}
  ```
* defaultFormValues - This will be used to set default values to form.
  ```
  defaultFormValues: {{
      name: 'Sample Name',
      email: 'sample@example.com'
  }}
  ```
  NOTE: Key must be same as input value, then only it'll patch values
* currentUser - Current users role id, it'll be used to restrict users to fill particular fields.
* submitBtnText - To change submit button text
* showResetBtn - Boolean value to show form reset button
* resetBtnText - To change reset button text
* btnContainerClass - Submit and reset buttons container class to add custom styling
* onFormReset - Callback on reset form
* isStepForm - To load it as step form
* stepFormProps - Configurations props for step form
  * containerClass - Container class for steps
  * nextBtnText - Next button text
  * prevBtnText - Previous button text
  * steps - Configuration for steps label and image
    * label - Label for step
    * image - Image url for step image

  ```
    stepFormProps={{
      steps: {
        userinfo: {
          label: 'first',
          image: 'https://via.placeholder.com/20',
        },
        userdetails: {
          label: 'sectond',
          image: 'https://via.placeholder.com/30',
        }
      },
      containerClass: 'stark-stepper-container',
      nextBtnText: '',
      prevBtnText: ''
    }}
  ```
  NOTE : steps object keys should match **sectionName** key from formschema

### JSON Schema
```
[
    {
        "sectionTitle": "User info",
        "containerClass": "user-section",
        "displaySection": true,
        "displaySectionTitle": true,
        "fields": [
            {
                "name": "name",
                "type": "text",
                "label": "Name",
                "id": "",
                "placeholder": "",
                "inputClass": "",
                "containerClass": "",
                "validations": [
                    {
                        "type": "required",
                        "applyWhen": [],
                        "applyWhenRelation": "OR"
                    }
                ],
                "errorMessage": { //To override error msg of require or whatever your pattern
                  "messages": {
                    "default": "First name and last name must be required."
                  }
                },
                "displayWhen": {
                    "conditions": [
                        {
                            "name": "gender",
                            "value": "female",
                            "condition": "=="
                        }
                    ],
                    "displayWhenRelation": "AND"
                },
                "disabled": false,
                "allowedUsers": []
            }
        ]
    }
]
```

You can have multiple sections in schema.


### Configurable JSON schema

* sectionTitle - Title of section
* containerClass - Class for section container
* displaySection - (Boolean value) whether to display section or not
* displaySectionTitle - (Boolean value) whether to display section title or not
* sectionLayout - Layout of sections. Allowed types '1column', '2column', '3column', '4column'.
* fields - Array of objects
  * id - Field identifier
  * name - Input name
  * type - Input type. Available type text, email, number, select, date, textarea, radio, checkbox, addmore
  * label - Label for input field
  * containerClass - Class for input container
  * placeholder - Placeholder for input type
  * inputClass - Input element class
  * validations - Validations for input element. Its array of objects
    * type - Type from react-simple-validator npm
    * applyWhen - Array of objects, conditions to apply validations
      * name - Input name
      * value - That input value
      * condition - Condition for name and value. Supported conditions are '==', '!=', '<=', '>=', '<', '>', 'empty', '!empty'
    * applyWhenRelation - 'AND'|'OR'. Relation for applyWhen conditions.
  * options - Array of objects. Options for 'radio','select','checkbox'.
    ```
    [{label: 'Option 1', value: 'option1'}, {label: 'Option 2', value: 'option2'}]
    ```
  * displayWhen - Object. This will be used for hide/show form element for particular conditions
    * conditions - Array of objects, conditions to apply validations
      * name - Input name
      * value - That input value
      * condition - Condition for name and value. Supported conditions are '==', '!=', '<=', '>=', '<', '>', 'empty', '!empty'
    * displayWhenRelation - 'AND'|'OR'. Relation for conditions.
  * disabled - To disable input field.
  * maxDateSelector - Form element name. If current type is date and to set maximum date this will be used
  * minDateSelector - Form element name. If current type is date and to set minimum date this will be used
  * callback - callback key. This will be called onchange of element
  * fields - If type is selected as "addmore" then to add fields under that input this options will be used.
  * fieldLayout - If type is selected as "addmore" then to set layout of add more section. Allowed types '1column', '2column', '3column', '4column'.
  * sectionClass - If type is selected as "addmore" then to add class for that section