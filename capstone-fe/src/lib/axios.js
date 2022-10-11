import axios from 'axios';

export const refreshAuthLogic = (failedRequest) => {
  const currRefreshToken = localStorage.getItem('refreshToken');
  axios.post(`${process.env.REACT_APP_BE_URL}/users/refresh-tokens`, {
    headers: {
      Authorization: `Bearer ${currRefreshToken}`,
    } }).then((response) => {
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);

    // eslint-disable-next-line no-param-reassign
    failedRequest.response.config.headers.Authorization = `Bearer${response.data.accessToken}`;

    return Promise.resolve();
  });
};

export const registerUser = async (firstName, lastName, email, password) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BE_URL}/users/register`, {
      name: firstName,
      surname: lastName,
      email,
      password,
    });
    if (response.status === 201) {
      window.location.href = process.env.REACT_APP_FE_HOME;
    }
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BE_URL}/users/login`, {
      email, password,
    });

    if (response.data.accessToken && response.data.refreshToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      window.location.href = process.env.REACT_APP_FE_HOME;
    }
  } catch (error) {
    console.log(error);
  }
};

// eslint-disable-next-line consistent-return
export const sendResetPin = async (email) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BE_URL}/pin/reset-password`, {
      email,
    });

    if (response.data) {
      return { message: response.data.message, status: response.status };
    }
  } catch (error) {
    console.log(error);
  }
};

