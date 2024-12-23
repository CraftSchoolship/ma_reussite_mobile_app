import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../http/config";
import { encode } from "../http/password_encoding";
import { decode as atob } from "base-64"; // Importing base-64 decode

// Get the token
export const getToken = async () => {
  const exp = await AsyncStorage.getItem("erp_token_expiration");
  const token = await AsyncStorage.getItem("erp_token");

  // If the token is expired, you might want to re-login or refresh it
  return token;
};

// Authentication function
export const authenticateWithUsernameAndPassword = async (username, password) =>
  authenticate("credentials", username, password, "", 0);
export const authenticateWithToken = async (token) =>
  authenticate("token", "", "", token, 0);
export const authenticateWithOAuth = async (provider, token) =>
  authenticate("oauth", "", "", token, provider);

export const authenticate = async (
  method,
  username = "",
  password = "",
  access_token = "",
  provider = 0
) => {
  try {
    const response = await axios.post(
      "/rest/auth",
      {
        method: method,
        database: config.workspace.erp.database,
        username: username,
        password: password,
        provider: provider,
        token: access_token,
      },
      {
        baseURL: config.workspace.erp.url,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if ("error" in response.data) {
      console.error("Authentication Failed", response.data.error);
      console.log("Authentication Response:", response.data);

      return false;
    }

    // Save access token
    const token = response.data.token;
    console.log("Authentication Response:", response.data);

    // Split the token into its three parts
    const parts = token.split(".");
    if (parts.length !== 3) {
      console.error("Invalid token format", token);
      return false;
    }

    try {
      // Decode the payload (second part) of the token
      const payload = JSON.parse(atob(parts[1])); // Decoding the payload part of the token
      console.log("Decoded Payload:", payload);

      // Save token and expiration to AsyncStorage
      await AsyncStorage.setItem("erp_token", token);
      await AsyncStorage.setItem(
        "erp_token_expiration",
        payload.exp.toString()
      );
      await AsyncStorage.setItem("erp_user_id", payload.sub.toString());
      await AsyncStorage.setItem("erp_username", username);
      await AsyncStorage.setItem("erp_password", encode(password));

      // Token is valid
      return true;
    } catch (error) {
      console.error("Failed to decode token payload:", error);
      return false;
    }
  } catch (error) {
    console.error("Authentication Failed", error);
    return false;
  }
};

// Logout function
export const logout = async () => {
  try {
    await AsyncStorage.removeItem("erp_token");
    await AsyncStorage.removeItem("erp_token_expiration");
    await AsyncStorage.removeItem("erp_user_id");
    await AsyncStorage.removeItem("erp_username");
    await AsyncStorage.removeItem("erp_password");
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

// Generic functions for CRUD operations
export const read = async (model, id, fields) => {
  try {
    const response = await axios.get(`/rest/models/${model}/${id}`, {
      baseURL: config.workspace.erp.url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getToken()}`,
      },
      params: {
        fields: fields.join(","),
      },
    });
    if ("error" in response.data) throw response.data.error;
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const browse = async (
  model,
  fields,
  filters = {},
  order = "id desc",
  page = 1,
  size = 999
) => {
  try {
    const response = await axios.get(`/rest/models/${model}`, {
      baseURL: config.workspace.erp.url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getToken()}`,
      },
      params: {
        _page: page,
        _size: size,
        _order: order,
        _fields: fields.join(","),
        ...filters,
      },
    });
    if ("error" in response.data) throw response.data.error;
    return response.data.content;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const create = async (model, data) => {
  try {
    const response = await axios.post(`/rest/models/${model}`, data, {
      baseURL: config.workspace.erp.url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getToken()}`,
      },
    });
    if ("error" in response.data) throw response.data.error;
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const update = async (model, id, data) => {
  try {
    const response = await axios.patch(`/rest/models/${model}/${id}`, data, {
      baseURL: config.workspace.erp.url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getToken()}`,
      },
    });
    if ("error" in response.data) throw response.data.error;
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const remove = async (model, id) => {
  try {
    const response = await axios.delete(`/rest/models/${model}/${id}`, {
      baseURL: config.workspace.erp.url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getToken()}`,
      },
    });
    if ("error" in response.data) throw response.data.error;
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
