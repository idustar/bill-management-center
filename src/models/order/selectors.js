export function itemSelector(state, ownProps) {
  return {
    item: state.product.item,
  };
}


export function listSelector(state, ownProps) {
  return {
    list: state.product.list,
  };
}
