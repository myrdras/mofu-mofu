import axios from 'axios';
import { apiUrl } from "./config";
import { getUserInfo } from "./localStorage";

export const getAllProducts = async ({ searchKeyword = "" }) => {
  try {
    let queryString = "?";
    if (searchKeyword) queryString += `searchKeyword=${searchKeyword}&`;

    const response = await axios({
      url: `${apiUrl}/api/products${queryString}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // if (response.statusText !== 'OK') {
    //   throw new Error(response.data.message);
    // }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

export const getProduct = async (id) => {
  try {
    const res = await axios({
      url: `${apiUrl}/api/products/${id}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // if (res.statusText !== 'OK') {
    //   throw new Error(res.data.message);
    // }
    return res.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
}
export const getProductBySlug = async (id) => {
  try {
    const res = await axios({
      url: `${apiUrl}/api/products/slug/${id}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // if (res.statusText !== 'OK') {
    //   throw new Error(res.data.message);
    // }
    return res.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
}

export const createProduct = async () => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/products`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // if (response.statusText !== "Created") {
    //   throw new Error(response.data.message);
    // }
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};

export const deleteProduct = async (productId) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/products/${productId}`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // if (response.statusText !== 'OK') {
    //   throw new Error(response.data.message);
    // }
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};

export const updateProduct = async (product) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/products/${product._id}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: product,
    });
    // if (response.statusText !== 'OK') {
    //   throw new Error(response.data.message);
    // }
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};

export const uploadProductImage = async (formData) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/uploads`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    });
    // if (response.statusText !== "Created") {
    //   throw new Error(response.data.message);
    // }
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};

export const getCategory = async (id) => {
  try {
    const res = await axios({
      url: `${apiUrl}/api/category/${id}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // if (res.statusText !== 'OK') {
    //   throw new Error(res.data.message);
    // }
    return res.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
}

export const signin = async ({ email, password }) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/users/signin`,
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      data: {
        email,
        password,
      },
    });
    // if (response.statusText !== 'OK') {
    //   throw new Error(response.data.message);
    // }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

export const createOrder = async (order) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/orders`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",s
      },
      data: order,
    });
    // if (response.statusText !== "Created") {
    //   throw new Error(response.data.message);
    // }
    return response.data;
  } catch (err) {
    return { error: err.response ? err.response.data.message : err.message };
  }
};
export const getOrders = async () => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/orders`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // if (response.statusText !== 'OK') {
    //   throw new Error(response.data.message);
    // }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};
export const deleteOrder = async (orderId) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/orders/${orderId}`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // if (response.statusText !== 'OK') {
    //   throw new Error(response.data.message);
    // }
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};
export const getOrder = async (id) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/orders/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    // if (response.statusText !== 'OK') {
    //   throw new Error(response.data.message);
    // }
    return response.data;
  } catch (err) {
    return { error: err.message };
  }
};

export const getSummary = async () => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/orders/summary`,
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    });

    return response.data;
  } catch (err) {
    return { error: err.response ? err.response.data.message : err.message };
  }
};