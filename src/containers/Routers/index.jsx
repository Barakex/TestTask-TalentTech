import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../Main';
import EmployeeInfo from '../EmployeeInfo';

const Routers = () => (
  <Switch>
    <Route exact path="/" component={Main} />
    <Route path="/employee/:id" component={EmployeeInfo} />
  </Switch>
);

export default Routers;
