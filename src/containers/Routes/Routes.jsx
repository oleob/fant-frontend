import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import './routes.scss';

import Home from '../Home';
import Floor from '../Floor';
import Error404 from '../Error404';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/floor/:floorName" component={Floor} />
      <Route>
        <Error404 />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Routes;
