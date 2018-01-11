import React from 'react';
import {connect} from 'dva';

import styles from './SearchPage.less';
import Layout from '../components/Layout';
import EditProductForm from "../components/EditProductForm";


class SearchPage extends React.Component {

  render() {
    const {dispatch} = this.props;
    return (
      <Layout loading={this.props.loading}>

            <div className={styles.card}>
              <h2>New Product</h2>
              <EditProductForm product={{}} dispatch={dispatch} onClose={() => this.onClose()} />
            </div>



      </Layout>
    );
  }
}

SearchPage.propTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.global,
  };
}

export default connect(mapStateToProps)(SearchPage);
