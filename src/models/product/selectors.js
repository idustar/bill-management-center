export function itemSelector(state, ownProps) {
  return {
    item: state.product.item,
    order: state.order.item,
    orders: state.order.list,
  };
}


export function listSelector(state, ownProps) {
  return {
    list: state.product.list,
  };
}
