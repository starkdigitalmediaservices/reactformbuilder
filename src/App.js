/* eslint-disable */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import InstituteComponent from './institute/instituteList.component';
import ChangePasswordComponent from './institute/changePassword.component';
import AddMoreFormComponent from './institute/addMoreForm.component';

function App() {
  return (
    <div>
      <Router>
        <div className="container">
          <Switch>
            <Route path="/" exact component={InstituteComponent}></Route>
            <Route path="/institute" exact component={InstituteComponent}></Route>
            <Route path="/institute" component={InstituteComponent}></Route>
          </Switch>
        </div>
      </Router>
    </div>

  );
}

export default App;