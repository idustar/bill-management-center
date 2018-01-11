import { stringify } from 'qs';

import request from '../utils/request';

const url = 'http://123.207.222.112:8082';

export function fetchProduct({ id }) {
  return request(`${url}/product?productId=${id}`);
}

export function fetchProductList() {
  return request(`${url}/product`);
}

export function queryProduct(params) {
  return request(`${url}/product/query`, {
    method: 'POST',
    body: params
  });
}

export function createProduct(params) {
  return request(`${url}/product`, {
    method: 'POST',
    body: params
  });
}

export function editProduct(params) {
  return request(`${url}/product`, {
    method: 'PUT',
    body: params
  });
}

export function deleteProduct(productId) {
  return request(`${url}/product?productId=${productId}`, {
    method: 'DELETE',
  });
}

export function fetchOrder({ id }) {
  return request(`${url}/order?orderId=${id}`);
}

export function fetchOrderList() {
  return request(`${url}/order`);
}

export function queryOrder({ params }) {
  return request(`${url}/order/query`, {
    method: 'POST',
    body: params
  });
}

export function createOrder(params) {
  return request(`${url}/order`, {
    method: 'POST',
    body: params
  });
}

export function editOrder(params) {
  return request(`${url}/order`, {
    method: 'PUT',
    body: params
  });
}

export function deleteOrder(orderId) {
  return request(`${url}/order?orderId=${orderId}`, {
    method: 'DELETE',
  });
}

export function fetchCustomer({ id }) {
  return request(`${url}/customer?customerId=${id}`);
}

export function fetchCustomerList() {
  return request(`${url}/customer`);
}

export function createCustomer(params) {
  return request(`${url}/customer`, {
    method: 'POST',
    body: params
  });
}

export function deleteCustomer(productId) {
  return request(`${url}/customer?customerId=${productId}`, {
    method: 'DELETE',
  });
}

export function fetchData() {
  return request(`${url}/info`)
}
