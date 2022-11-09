/* eslint-disable consistent-return */
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

export const refreshAuthLogic = async (failedRequest) => {
  if (localStorage.getItem('accessToken')) {
    const currRefreshToken = localStorage.getItem('refreshToken');
    const response = await axios.post(`${process.env.REACT_APP_BE_URL}/users/refresh-tokens`, {}, {
      headers: {
        Authorization: `Bearer ${currRefreshToken}`,
      } });
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    localStorage.setItem('test', 'test');
    // eslint-disable-next-line no-param-reassign
    failedRequest.response.config.headers.Authorization = `Bearer ${response.data.accessToken}`;

    return Promise.resolve();
  } if (localStorage.getItem('googleAccessToken')) {
    const currRefreshToken = localStorage.getItem('googleRefreshToken');
    const response = await axios.post(`${process.env.REACT_APP_BE_URL}/users/refresh-tokens`, {}, {
      headers: {
        Authorization: `Bearer ${currRefreshToken}`,
      } });
    localStorage.setItem('googleAccessToken', response.data.accessToken);
    localStorage.setItem('googleRefreshToken', response.data.refreshToken);
    // eslint-disable-next-line no-param-reassign
    failedRequest.response.config.headers.Authorization = `Bearer ${response.data.accessToken}`;

    return Promise.resolve();
  }
};

createAuthRefreshInterceptor(axios, refreshAuthLogic);

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
      const googleAccessToken = localStorage.getItem('googleAccessToken');
      if (googleAccessToken) localStorage.removeItem('googleAccessToken');
      window.location.href = `${process.env.REACT_APP_FE_HOME}/home`;
    } if (response.status !== 200) {
      return response;
    }
  } catch (error) {
    return error.response;
  }
};

export const getDataForUser = async (token) => {
  try {
    if (token) {
      const { data } = await axios.get(`${process.env.REACT_APP_BE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        } });

      if (data) {
        return data;
      }
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

  return response;
};

export const createProduct = async (body, file) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BE_URL}/products`,
      body,
    );

    await handleFileSend(file, response.data._id);
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
  const accessToken = localStorage.getItem('accessToken');
  const googleAccessToken = localStorage.getItem('googleAccessToken');

  if (accessToken) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BE_URL}/users/me/favorites`,
        {
          productId,
        },
        { headers: {
          Authorization: `Bearer ${accessToken}`,
        } },
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  } else if (googleAccessToken) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BE_URL}/users/me/favorites`,
        {
          productId,
        },
        { headers: {
          Authorization: `Bearer ${googleAccessToken}`,
        } },
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const getUsers = async () => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_BE_URL}/users`);
    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getChatsForUser = async (userId) => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_BE_URL}/chats/${userId}`);
    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMessagesForChat = async (chatId) => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_BE_URL}/messages/${chatId}`);
    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const sendMessage = async (chatId, senderId, text) => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_BE_URL}/messages`, {
      chatId, senderId, text,
    });
    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const changeOrderStatus = async (orderId, status, token) => {
  try {
    const { data } = await axios.patch(`${process.env.REACT_APP_BE_URL}/orders/${orderId}}`, {
      status: `${status ? 'Resolved' : 'Unresolved'}`,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },

    });
    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getTopProducts = async () => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_BE_URL}/products/top`, {
    });
    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getOrdersForUser = async (token) => {
  try {
    if (token) {
      const { data } = await axios.get(`${process.env.REACT_APP_BE_URL}/orders/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        } });

      if (data) {
        return data;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

