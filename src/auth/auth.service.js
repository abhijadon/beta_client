// login.js
import { API_BASE_URL } from '@/config/serverApiConfig';
import axios from 'axios';
import errorHandler from '@/request/errorHandler';
import successHandler from '@/request/successHandler';

export const login = async ({ loginData }) => {
  try {
    const response = await axios.post(
      API_BASE_URL + `user/login?timestamp=${new Date().getTime()}`,
      loginData
    );

    const { status, data } = response;

    // Assuming the role is available in 'data' returned from the server
    const { role } = data;

    // Set the role in localStorage
    window.localStorage.setItem('auth', role);

    // Set isLoggedIn to true
    window.localStorage.setItem('isLoggedIn', true);

    successHandler(
      { data, status },
      {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      }
    );
    return data;
  } catch (error) {
    return errorHandler(error);
  }
};

export const logout = async () => {
  axios.defaults.withCredentials = true;
  try {
    window.localStorage.clear();
    // Clear isLoggedIn and auth
    window.localStorage.removeItem('isLoggedIn');
    window.localStorage.removeItem('auth');
    await axios.post(API_BASE_URL + `user/logout?timestamp=${new Date().getTime()}`);
  } catch (error) {
    return errorHandler(error);
  }
};
