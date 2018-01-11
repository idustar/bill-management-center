import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link, Redirect } from 'dva/router';
import ListPage from './routes/ListPage';
import StatPage from './routes/StatPage';
import ItemPage from './routes/ItemPage';
import SearchPage from './routes/SearchPage';
import UserPage from './routes/UserPage';
import SimpleListPage from './routes/SimpleListPage';
import OrderListPage from './routes/OrderListPage';
import OrderPage from './routes/OrderPage';
import NewProductPage from './routes/NewProductPage';
import NewUserPage from "./routes/NewUserPage";

export default function ({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={SearchPage} />
      <Route path="/products" component={ListPage} />
      <Route path="/orders" component={OrderListPage} />
      <Route path="/order/:orderId" component={OrderPage} />
      <Route path="/new" component={NewProductPage} />
      <Route path="/product/:productId" component={ItemPage} />
      <Route path="/customer/:customerId" component={UserPage} />
      <Route path="/customers" component={SimpleListPage} />
      <Route path="/new_customer" component={NewUserPage} />
    </Router>
  );
}
