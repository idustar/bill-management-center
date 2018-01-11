import React from 'react';
import {connect} from 'dva';

import styles from './SearchPage.less';
import Layout from '../components/Layout';
import OrderList from "../components/OrderList";


class SearchPage extends React.Component {

  render() {
    const {orders, dispatch} = this.props;
    return (
      <Layout loading={this.props.loading}>

            <div className={styles.card}>
              <h2>Orders</h2>
              <OrderList productId={-1} orders={orders} dispatch={dispatch}/>
            </div>



      </Layout>
    );
  }
}

SearchPage.propTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.global,
    orders: state.order.list,
  };
}

export default connect(mapStateToProps)(SearchPage);
