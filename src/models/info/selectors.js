

export function dataSelector(state, ownProps) {
  return {
    data: state.info.data,
  };
}

export function searchSelector(state, ownProps) {
  return {
    search: state.info.search,
  };
}
