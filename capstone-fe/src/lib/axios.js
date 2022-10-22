/* eslint-disable consistent-return */
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

export const addProductToCart = async (productId, quantity) => {
  const accountId = localStorage.getItem('account_id');
  try {
    if (accountId) {
      const response = await axios.post(`${process.env.REACT_APP_BE_URL}/cart/${accountId}`, {
        productId,
        quantity: quantity || 1,
      });
      if (response.data) {
        return response.data.products;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const RemoveProductFromCart = async (productId) => {
  const accountId = localStorage.getItem('account_id');
  try {
    if (accountId) {
      const response = await axios.post(`${process.env.REACT_APP_BE_URL}/cart/${accountId}/remove`, {
        productId,
      });
      if (response.data) {
        return response.data.products;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleFileSend = async (selectedFile, id) => {
  const data = new FormData();
  data.append('image', selectedFile);
  const response = await axios.post(
    `${process.env.REACT_APP_BE_URL}/products/${id}/image`,
    data,
  );
  console.log(response);
  return response;
};

export const createProduct = async (body, file) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BE_URL}/products`,
      body,
    );

    const product = await handleFileSend(file, response.data._id);

    console.log(response.data);
    console.log(product.data);
  } catch (error) {
    console.log(error);
  }
};

export const resetPassword = async (email, pin, newPassword) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_BE_URL}/users/password-reset`,
      { email, pin, newPassword },
    );

    if (response.data) {
      return { message: response.data.message, status: response.status };
    }
  } catch (error) {
    console.log(error);
  }
};

export const addProductToFavorites = async (productId) => {
  const token = localStorage.getItem('accessToken');
  if (!token) return;
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BE_URL}/users/me/favorites`,
      {
        productId,
      },
      { headers: {
        Authorization: `Bearer ${token}`,
      } },
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
