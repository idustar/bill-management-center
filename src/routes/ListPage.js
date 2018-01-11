import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './ListPage.less';
import { listSelector } from '../models/product/selectors';
import ItemList from '../components/ItemList';
import Layout from '../components/Layout';

function ListPage({ loading, list, location, dispatch }) {
  return (
    <Layout loading={loading}>
      <div className={styles.normal}>

        <ItemList
          loading={loading}
          list={list}
          location={location}
          dispatch={dispatch}
        />
      </div>
    </Layout>
  );
}

ListPage.propTypes = {
};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.global,
    ...listSelector(state, ownProps),
  };
}

export default connect(mapStateToProps)(ListPage);
