import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import styles from './ListPage.less';
import Layout from '../components/Layout';
import SimpleList from "../components/SimpleList";

class SimpleListPage extends Component {
  componentDidMount () {
    this.props.dispatch({
      type: 'customer/fetchList',
    })
  }
  render() {
    const {loading, items, location, dispatch,} = this.props;
    return (
      <Layout loading={loading}>
        <div className={styles.normal}>
          <SimpleList
            loading={loading}
            items={items}
            location={location}
            dispatch={dispatch}
          />
        </div>
      </Layout>
    );
  };
}

SimpleListPage.propTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.global,
    items: state.customer.list,
  };
}

export default connect(mapStateToProps)(SimpleListPage);
