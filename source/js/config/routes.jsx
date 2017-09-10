import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

// import Dashboard from 'views/Dashboard';
import Login from 'views/Login';
import Main from 'views/Main';
import NotFound from 'views/NotFound';

const publicPath = '/';

export const routeCodes = {
  DASHBOARD: publicPath,
  LOGIN: `${ publicPath }login`,
};

export default () => (
  <Switch>
    {
      <Route exact path={ publicPath } component={ Main } />
    }
    <Route path={ routeCodes.LOGIN } component={ Login } />
    <Redirect from='*' to={ publicPath } />
  </Switch>
);
