import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home/home';
import Layout from './hoc/layout';
import BookView from './components/Books';

const Routes = () => (
  <div>
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/books/:id" exact component={BookView} />
      </Switch>
    </Layout>
  </div>
);

export default Routes;
