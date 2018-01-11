import pathToRegexp from 'path-to-regexp';
import {
  fetchProduct, fetchProductList, createProduct, deleteProduct, editProduct, queryProduct, createOrder, editOrder,
  deleteOrder
} from '../../services/api';
import {notification} from 'antd';
import {routerRedux} from 'dva/router';

export default {
  namespace: 'product',
  state: {
    item: {},
    list: [],
  },
  subscriptions: {},
  effects: {
    * fetch({payload: id}, {call, put}) {

      if (!id) return;
      const response = yield call(fetchProduct, {id});
      if (response.code === 200) {
        yield put({type: 'saveItem', payload: response.result})
      }
    },
    * fetchList({payload: query}, {call, put}) {
      let response;
      if (!query.title && !query.category)
        response = yield call(fetchProductList);
      else {
        const params = {
          title: query.title ? query.title : undefined,
          category: query.category?query.category:undefined,
        }
        response = yield call(queryProduct, params)
      }
      if (response.code === 200) {
        yield put({type: 'saveList', payload: Array.isArray(response.result) ? response.result : []})
      }
    },
    * create({payload: values}, {call, put}) {
      const response = yield call(createProduct, values);
      if (response.code === 200) {
        yield put({type: 'saveItem', payload: response.result})
        notification.success({message: 'create successfully!'})
        yield put(routerRedux.push(`/product/${response.result.productId}`));
      }
    },
    * del({payload: productId}, {call, put}) {
      const response = yield call(deleteProduct, productId);
      if (response.code === 200) {
        notification.success({message: 'delete successfully!'})
      }
    },
    * edit({payload: values}, {call, put}) {
      const response = yield call(editProduct, values);
      if (response.code === 200) {
        notification.success({message: 'edit successfully!'})
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
