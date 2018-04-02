import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home/home';
import Layout from './hoc/layout';
import BookView from './components/Books';
import Login from './containers/Admin/login';

const Routes = () => (
  <div>
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/books/:id" exact component={BookView} />
      </Switch>
    </Layout>
  </div>
);

export default Routes;
