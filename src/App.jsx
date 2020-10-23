import React from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/details/:id' component={DetailsPage} />
    </Switch>
  );
}

export default withRouter(App);
