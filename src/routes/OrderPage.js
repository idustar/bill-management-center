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
              <h2>Order</h2>
              <OrderList orderId={this.props.params.orderId} orders={orders} dispatch={dispatch}/>
            </div>



      </Layout>
    );
  }
}

SearchPage.propTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.global,
    orders: [{...state.order.item, key:1}],
  };
}

export default connect(mapStateToProps)(SearchPage);
