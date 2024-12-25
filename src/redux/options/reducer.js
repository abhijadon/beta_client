import { FETCH_OPTIONS_PENDING, FETCH_OPTIONS_SUCCESS, FETCH_OPTIONS_FAILURE } from './types';

const initialState = {
  data: {
    roles: { data: [], loading: false },
    navigation: { data: [], loading: false },
    institutes: { data: [], loading: false },
    university: { data: [], loading: false },
    modes: { data: [], loading: false },
    course: { data: [], loading: false },
    subcourse: { data: [], loading: false },
    // other entities...
  },
  loading: {},
  error: null,
};

const optionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OPTIONS_PENDING: {
      const { entity } = action.payload;
      return {
        ...state,
        loading: {
          ...state.loading,
          [entity]: true,
        },
        error: null,
      };
    }

    case FETCH_OPTIONS_SUCCESS: {
      const { entity, result } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          [entity]: {
            data: result,
            loading: false,
          },
        },
        loading: {
          ...state.loading,
          [entity]: false,
        },
      };
    }

    case FETCH_OPTIONS_FAILURE: {
      const { entity, error } = action.payload;
      return {
        ...state,
        loading: {
          ...state.loading,
          [entity]: false,
        },
        error,
      };
    }

    default:
      return state;
  }
};

export default optionsReducer;
