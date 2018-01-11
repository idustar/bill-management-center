import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {Rate, Row, Col, Tag, Tabs, Button, Modal} from 'antd';
import {Link} from 'dva/router';
import styles from './ItemPage.less';
import {routerRedux} from 'dva/router';
import {itemSelector} from '../models/product/selectors';
import Layout from '../components/Layout';
import NewOrderForm from '../components/NewOrderForm';
import EditProductForm from '../components/EditProductForm';
import OrderList from '../components/OrderList';
import Spinner from '../components/Spinner';

import movieDefaultImg from '../assets/images/movie.jpg'

const TabPane = Tabs.TabPane;

class ItemPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      activeKey: "1",
    }
    this.onSwitch = this.onSwitch.bind(this);
  }
  componentDidMount() {
    this.onShow();

  }

  onSwitch(activeKey) {
    this.setState({
      activeKey
    });
  }

  onShow() {
    this.props.dispatch({
      type: 'product/fetch',
      payload: this.props.params.productId,
    })
  }

  onClose() {
    this.setState({
      visible: false
    })
    this.onShow();
  }

  onCreate() {
    this.onSwitch('2');
  }

  onDelete() {
    this.props.dispatch({
      type: 'product/del',
      payload: this.props.params.productId,
    });
    this.props.dispatch(routerRedux.push('/'));
  }

  render() {
    const {loading, item, order, orders, dispatch} = this.props;
    if (!(item && item.productId)) return null;
    return (
      <Layout loading={loading}>

        <div className={styles.normal}>
          <Spinner loading={loading}/>
          <div className={styles.header}>
            <div className={styles.titlebar}>
              <h1>{item.title}</h1>
              <Rate className={styles.rate} allowHalf disabled defaultValue={Math.round(item.rating * 2) / 2}/>
              <span className={styles.meta}>{Math.round((item.rating || 0)*10)/10} stars</span>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.poster}>
              <img className={styles.photo} src={item['imageUrl'] || movieDefaultImg}/>
            </div>

            <div className={styles.content}>
              {item.price ? <Row>
                <Col span={8}>
                  <div className={styles.itemname}>Price</div>
                </Col>
                <Col span={14} offset={2}>
                  <div className={styles.itemcontent}>{item['price']}</div>
                </Col>
              </Row> : null}
              {item.category ? <Row>
                <Col span={8}>
                  <div className={styles.itemname}>Category</div>
                </Col>
                <Col span={14} offset={2}>
                  <div className={styles.itemcontent}><Tag>{item['category']}</Tag></div>
                </Col>
              </Row> : null}

              {item.rank ? <Row>
                <Col span={8}>
                  <div className={styles.itemname}>Rank</div>
                </Col>
                <Col span={14} offset={2}>
                  <div className={styles.itemcontent}>{item['rank']}</div>
                </Col>
              </Row> : null}
              {item.soldCnt ? <Row>
                <Col span={8}>
                  <div className={styles.itemname}>Sold</div>
                </Col>
                <Col span={14} offset={2}>
                  <div className={styles.itemcontent}>{item['soldCnt']}</div>
                </Col>
              </Row> : null}
              {item.inventoryCnt ? <Row>
                <Col span={8}>
                  <div className={styles.itemname}>Inventory</div>
                </Col>
                <Col span={14} offset={2}>
                  <div className={styles.itemcontent}>{item['inventoryCnt']}</div>
                </Col>
              </Row> : null}
            </div>
          </div>

          <div className={styles.card}>
            <Tabs activeKey={this.state.activeKey} style={{width: '100%'}} onChange={this.onSwitch}>
              <TabPane tab="New Order" key="1">
                <Row>
                  <Col span={14} offset={2} style={{marginTop: 10}}>
                    <NewOrderForm order={{...order, productId: item.productId}}
                                  dispatch={dispatch} onClose={() => this.onCreate()}/>
                  </Col>
                </Row>

              </TabPane>
              <TabPane tab="Order List" key="2">
                <OrderList productId={item.productId} orders={orders} dispatch={dispatch}/>
              </TabPane>
            </Tabs>
          </div>

          <div className={styles.card}>
            <div><h2>Dashboard</h2>
            <div>
              <Button onClick={() => this.setState({visible: true})}>Edit</Button>
              <span>&nbsp;&nbsp;</span>
              <Button type="danger" onClick={() => this.onDelete()}>Delete</Button>
            </div>
            </div>
          </div>
        </div>
        <Modal
          onCancel={() => this.setState({visible: false})}
          footer={null}
          title="Edit Product"
          visible={this.state.visible}
        >
          <EditProductForm product={item}
                           dispatch={dispatch} onClose={() => this.onClose()}/>
        </Modal>
      </Layout>
    );
  }
}


ItemPage.propTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.global,
    ...itemSelector(state, ownProps),
  };
}

export default connect(mapStateToProps)(ItemPage);
