import React from 'react';
import {Form, Icon, Input, Button, Select, Checkbox, DatePicker, Switch} from 'antd';
import {Link, routerRedux} from 'dva/router';
import {connect} from 'dva/index';
import {searchSelector} from '../models/info/selectors';
import styles from './Search.less';


const Searchs = Input.Search;
const RangePicker = DatePicker.RangePicker;


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.search = this.search.bind(this);
  }

  toggle = () => {
    this.setState({
      open: !this.state.open,
    });
  }

  search() {
    const {search, dispatch} = this.props;
    console.log(search);
    if (search.type === 'product') {
      const title = search.title ? `title=${search.title}` : '';
      const category = search.category ? `category=${search.category}` : '';
      dispatch(routerRedux.push('/products'+((title || category)?'?':'') + title + ((title && category)?'&':'') + category));
    } else if (search.type === 'order') {
      if (!search.title) dispatch(routerRedux.push('/orders'));
      else dispatch(routerRedux.push(`/order/${search.title}`));
    } else if (search.type === 'customer') {
      if (!search.title) dispatch(routerRedux.push('/customers'));
      else dispatch(routerRedux.push(`/customer/${search.title}`));
    }
  }

  handleChange(event) {
    this.props.dispatch({
      type: 'info/changeFormValue',
      payload: {
        key: event.target.dataset.for,
        value: event.target.value,
      }
    })
  }

  handleTypeChange(value) {
    this.props.dispatch({
      type: 'info/changeFormValue',
      payload: {
        key: 'type',
        value,
      }
    })
  }

  render() {
    const {search} = this.props;
    const selectBefore = (
      <Select defaultValue={search.type} style={{ width: 90 }} data-for="type" onChange={this.handleTypeChange}>
        <Select.Option value="product">product</Select.Option>
        <Select.Option value="customer">customer</Select.Option>
        <Select.Option value="order">order</Select.Option>
      </Select>
    );
    const placeholders = {
      product: 'product title', customer: 'blank for query all, or customer id', order: 'blank for query all, or order id',
    }
    return (
      <div>

        <Searchs size="large" data-for="title" placeholder={placeholders[search.type]}
                 addonBefore={selectBefore}
                 onSearch={this.search}
                 defaultValue={search.title}
                 enterButton onChange={this.handleChange}/>
        <div>
            <div>
              {search.type === 'product' ?
              <Input addonBefore="Category" data-for="category" style={{marginTop: 10}}
                     placeholder="CATEGORY NAME" defaultValue={search.category} onChange={this.handleChange}/>
                : null}
            </div>

        </div>


      </div>
    );
  }
}

Search.propTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    ...searchSelector(state, ownProps),
  };
}

export default connect(mapStateToProps)(Search);


