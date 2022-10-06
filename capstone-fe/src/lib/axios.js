import axios from 'axios';

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

    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      window.location.href = process.env.REACT_APP_FE_HOME;
    }
  } catch (error) {
    console.log(error);
  }
};

export const sendResetPin = async (email) => {
  try {
    const { data: message } = await axios.post(`${process.env.REACT_APP_BE_URL}/pin/reset-password`, {
      email,
    });

    if (message) {
      return message;
    }
  } catch (error) {
    console.log(error);
  }
};
