import React from 'react';
import { Route, Switch, browserHistory } from 'react-router-dom';
import Main from '../Main';
import EmployeeInfo from '../EmployeeInfo';

const Routers = () => (
  <Switch history={browserHistory}>
    <Route exact path="/" component={Main} />
    <Route path="/employee/:id" component={EmployeeInfo} />
  </Switch>
);

export default Routers;
