import pathToRegexp from 'path-to-regexp';
import {
  fetchOrder, fetchOrderList, createOrder, deleteOrder, editOrder, queryOrder
} from '../../services/api';
import {notification} from 'antd';

export default {
  namespace: 'order',
  state: {
    item: {},
    list: [],
  },
  subscriptions: {},
  effects: {
    * create({payload: values}, {call, put}) {
      const response = yield call(createOrder, values);
      if (response.code === 200) {
        yield put({type: 'saveItem', payload: response.result})
        notification.success({message: 'create successfully!'})
      }
    },
    * del({payload: orderId}, {call, put}) {
      const response = yield call(deleteOrder, orderId);
      if (response.code === 200) {
        notification.success({message: 'delete successfully!'})
      }
    },
    * edit({payload: values}, {call, put}) {
      const response = yield call(editOrder, values);
      if (response.code === 200) {
        notification.success({message: 'edit successfully!'})
      }
    },
    * fetch({payload: id}, {call, put}) {
      if (!id) return;
      const response = yield call(fetchOrder, {id});
      if (response.code === 200) {
        yield put({type: 'saveItem', payload: response.result})
      }
    },
    * fetchList(_, {call, put}) {
      const response = yield call(fetchOrderList);
      if (response.code === 200) {
        yield put({type: 'saveList', payload: Array.isArray(response.result) ? response.result : []})
      }
    },
    * fetchListByProduct({payload: productId}, {call, put}) {
      const params = {productId}
      const response = yield call(queryOrder, {params});
      if (response.code === 200) {
        yield put({type: 'saveList', payload: Array.isArray(response.result) ? response.result : []})
      }
    },
    * fetchListByCustomer({payload: customerId}, {call, put}) {
      const params = {customerId}
      const response = yield call(queryOrder, {params});
      if (response.code === 200) {
        yield put({type: 'saveList', payload: Array.isArray(response.result) ? response.result : []})
      }
    },
  },
  reducers: {
    saveItem(state, {payload: item}) {
      return {...state, item};
    },
    saveList(state, {payload: list}) {
      return {...state, list};
    },
  },
}
