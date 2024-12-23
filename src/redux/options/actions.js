import axios from 'axios';
import { FETCH_OPTIONS_PENDING, FETCH_OPTIONS_SUCCESS, FETCH_OPTIONS_FAILURE } from './types';

// Action Creators
export const fetchOptionsPending = (entity) => ({
  type: FETCH_OPTIONS_PENDING,
  payload: { entity },
});

export const fetchOptionsSuccess = (entity, result) => ({
  type: FETCH_OPTIONS_SUCCESS,
  payload: { entity, result },
});

export const fetchOptionsFailure = (entity, error) => ({
  type: FETCH_OPTIONS_FAILURE,
  payload: { entity, error },
});

// Function to fetch options (manual async call without redux-thunk)
export const fetchOptions = (entity) => {
  return (dispatch) => {
    dispatch(fetchOptionsPending(entity));
    axios
      .get(`/${entity}/options`) // Corrected the syntax here
      .then((response) => {
        console.log('API response:', response.data);
        if (!response.data.success) {
          throw new Error('Failed to fetch data');
        }
        dispatch(fetchOptionsSuccess(entity, response.data.result));
      })
      .catch((error) => {
        dispatch(fetchOptionsFailure(entity, error.response?.data || 'Fetch list failed'));
      });
  };
};
