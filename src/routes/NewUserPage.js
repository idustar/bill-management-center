import React from 'react';
import {connect} from 'dva';
import {Button, Input} from 'antd';
import styles from './SearchPage.less';
import Layout from '../components/Layout';


class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }
    this.onChange = this.onChange.bind(this);
  }

  onCreate() {
    this.props.dispatch({
      type: 'customer/create',
      payload: this.state.value,
    })
  }

  onChange(event) {
    this.setState({
      value: event.target.value,
    })
  }

  render() {
    const {dispatch} = this.props;
    return (
      <Layout loading={this.props.loading}>
        <div className={styles.card}>
          <h2>New Customer</h2>
          <Input value={this.state.value} onChange={this.onChange}/>
          <Button style={{marginTop: 10}} onClick={() => this.onCreate()}>create</Button>
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
