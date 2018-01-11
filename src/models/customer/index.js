import pathToRegexp from 'path-to-regexp';
import {createCustomer, deleteCustomer, fetchCustomerList} from "../../services/api";
import {notification} from 'antd';
import {routerRedux} from 'dva/router';

export default {
  namespace: 'customer',
  state: {
    list: {},
  },
  subscriptions: {
  },
  effects: {
    * fetchList(_, {call, put}) {
      const response = yield call(fetchCustomerList);
      if (response.code === 200) {
        yield put({type: 'saveList', payload: Array.isArray(response.result) ? response.result : []})
      }
    },
    * del({payload: customerId}, {call, put}) {
      const response = yield call(deleteCustomer, customerId);
      if (response.code === 200) {
        notification.success({message: 'delete successfully!'})
        yield put(routerRedux.push(`/`));
      }
    },
    * create({payload: values}, {call, put}) {
      const params = {customerId: values}
      const response = yield call(createCustomer, params);
      if (response.code === 200) {
        notification.success({message: 'create successfully!'})
        yield put(routerRedux.push(`/customer/${response.result.customerId}`));
      }
    },
  },
  reducers: {
    saveList(state, { payload: list }) {
      return { ...state, list};
    },
  },
}
