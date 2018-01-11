import React from 'react';
import {Table, Rate, Button, Modal} from 'antd';
import EditOrderForm from './EditOrderForm';
import {Link} from 'dva/router';


class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      row: undefined,
    }
  }

  componentDidMount() {
    this.onShow();
  }

  onShow() {
    if (this.props.orderId) {
      this.props.dispatch({
        type: 'order/fetch',
        payload: this.props.orderId,
      })
    } else if (this.props.customerId) {
      this.props.dispatch({
        type: 'order/fetchListByCustomer',
        payload: this.props.customerId,
      })
    } else if (this.props.productId === -1) {
      this.props.dispatch({
        type: 'order/fetchList',
      })
    } else if (this.props.productId) {
      this.props.dispatch({
        type: 'order/fetchListByProduct',
        payload: this.props.productId,
      })
    }
  }

  onEdit(row) {
    this.setState({
      row,
      visible: true,
    })
  }

  onClose() {
    this.setState({
      visible: false
    })
    this.onShow();
  }

  onDelete(orderId) {
    this.props.dispatch({
      type: 'order/del',
      payload: orderId,
    })
    this.onShow();
  }

  onChange(pagination, filters, sorter) {
    console.log('params', pagination, filters, sorter);
  }

  render() {
    const {orders, customerId} = this.props;
    const productColumn = {
      title: 'Product',
      dataIndex: 'productId',
      render: (text, row, index) => {
        return <Link to={`/product/${text}`}>{text}</Link>
      },
      sorter: (a, b) => a.product - b.product,
    };
    let columns = [{
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    }, {
      title: 'Customer',
      dataIndex: 'customerId',
      render: (text, row, index) => {
        return <Link to={`/customer/${text}`}>{text}</Link>
      },
      sorter: (a, b) => a.customer - b.customer,
    }, {
      title: 'Time',
      dataIndex: 'time',
      render: (text, row, index) => {
        return `${new Date(text).toLocaleString()}`
      },
      sorter: (a, b) => a.time - b.time,
    }, {
      title: 'Base Price',
      dataIndex: 'basePrice',
      sorter: (a, b) => a.basePrice - b.basePrice,
    }, {
      title: 'Discount',
      dataIndex: 'discountRate',
      sorter: (a, b) => a.discountRate - b.discountRate,
    }, {
      title: 'Count',
      dataIndex: 'productCnt',
      sorter: (a, b) => a.productCnt - b.productCnt,
    }, {
      title: 'Rating',
      dataIndex: 'rating',
      sorter: (a, b) => a.rating - b.rating,
      render: (text, row, index) => {
        return <Rate allowHalf disabled value={text}/>
      },
    }, {
      title: 'Action',
      dataIndex: '',
      render: (text, row, index) => [<Button onClick={() => this.onEdit(row)} key={1}>Edit</Button>,
        <Button type='danger' key={2} onClick={() => this.onDelete(row.id)}>Delete</Button>]
    }];
    if (customerId) {
      columns[1] = productColumn;
    }


    return (
      <div>
        <Modal
          footer={null}
          title="Edit Order"
          visible={this.state.visible}
          onCancel={() => this.setState({visible: false})}
        >
          <EditOrderForm order={this.state.row} dispatch={this.props.dispatch} onClose={() => this.onClose()}/>
        </Modal>
        <Table columns={columns} dataSource={orders} rowKey='id'/>
      </div>
    )
  }
}

export default OrderList;
