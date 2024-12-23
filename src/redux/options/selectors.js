export const selectOptionsData = (state) => state.options.data;
export const selectOptionsLoading = (state) => state.options.loading;
export const selectOptionsError = (state) => state.options.error;
export const selectSpecificEntityData = (state, entity) => state.options.data[entity]?.data || [];

export const selectSpecificEntityLoading = (state, entity) =>
  state.options.data[entity]?.loading || false;
