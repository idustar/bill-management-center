import React from 'react';
import {connect} from 'dva';

import styles from './SearchPage.less';
import Layout from '../components/Layout';
import GenreChart from '../components/GenreChart';
import Search from '../components/Search';


class SearchPage extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'info/fetch',
    });
  }

  render() {
    const {data} = this.props;
    const extraContent = (
      <div>
        <div className={styles.extraContent}>
          <div className={styles.statItem}>
            <p>Products</p>
            <p>{data.productCnt || 0}</p>
          </div>
          <div className={styles.statItem}>
            <p>Orders</p>
            <p>{data.orderCnt || 0}</p>
          </div>
          <div className={styles.statItem}>
            <p>Categories</p>
            <p>{data.categories ? data.categories.length : 0}</p>
          </div>
          <div className={styles.statItem}>
            <p>Customers</p>
            <p>{data.customerCnt || 0}</p>
          </div>
        </div>

      </div>
    );
    return (
      <Layout loading={this.props.loading}>
        <div className={styles.normal}>
          <div className={styles.header}>
            <div className={styles.titlebar}>
              <div>
                <h1>CC</h1>

              </div>
              <div className={styles.stat}>
                {extraContent}
              </div>
            </div>
          </div>
        </div>


            <div className={styles.card}>
              <h2>Search</h2>
              <Search/>
            </div>


          <div className={styles.card}>
            <h2>Categories</h2>
            <GenreChart data={data.categories}/>
          </div>
      </Layout>
    );
  }
}

SearchPage.propTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.global,
    data: state.info.data,
  };
}

export default connect(mapStateToProps)(SearchPage);
