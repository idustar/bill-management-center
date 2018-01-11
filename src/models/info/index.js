import pathToRegexp from 'path-to-regexp';
import {
  fetchData
} from '../../services/api';
import {notification} from 'antd';

export default {
  namespace: 'info',
  state: {
    data: {
      productCnt: 0,
      customerCnt: 0,
      categories: [{
        name: "Network is disconnected",
        count: 12
      },{
        name: "Try layer",
        count: 12
      },],
      orderCnt: 0,
    },
    search: {
      category: '',
      title: '',
      type: 'product',
    }
  },
  subscriptions: {},
  effects: {

    * fetch(_, {call, put}) {

      const response = yield call(fetchData);
      if (response.code === 200) {
        yield put({type: 'saveData', payload: response.result})
      }
    },
  },
  reducers: {
    changeFormValue(state, {payload: {key, value}}) {
      let search = {...state.search};
      search[key] = value;
      return {...state, search};
    },
    saveData(state, {payload: data}) {
      return {...state, data};
    },
  },
}
