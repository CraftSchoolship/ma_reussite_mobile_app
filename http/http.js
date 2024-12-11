import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../http/config";
import { encode } from "../http/password_encoding";

// const jsonRpcRequest = async (service, method, args) => {
//   try {
//     const response = await axios.post(
//       "/jsonrpc",
//       {
//         jsonrpc: "2.0",
//         method: "call",
//         params: {
//           service: service,
//           method: method,
//           args: [config.workspace.erp.database, ...args],
//         },
//         id: new Date().getTime(),
//       },
//       {
//         baseURL: config.workspace.erp.url,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     console.log("RPC Response:", response.data);

//     if ("error" in response.data) throw response.data.error;
//     return response.data.result;
//   } catch (error) {
//     console.error("Remote Procedure Calling Failed", error);
//     throw error;
//   }
// };

// Get the token
export const getToken = async () => {
  const exp = await AsyncStorage.getItem("erp_token_expiration");
  // TODO get current timestamp, then check if expiration is still far
  // at least 5 minutes from now,
  // if token expired, we should re-login
  // if token is about to expire, we should regenerate it

  // Example if token is expired
  // await authenticateWithUsernameAndPassword(
  //     await AsyncStorage.getItem("erp_username"),
  //     await AsyncStorage.getItem("erp_password")
  // );

  // Example if token is about to expire
  // await authenticateWithToken(
  //     await AsyncStorage.getItem("erp_token")
  // );

  const token = await AsyncStorage.getItem("erp_token");
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
  token = "",
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
        token: token,
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
      return false;
    }

    // save access token
    config.erpToken = response.data.token;
    payload = JSON.parse(atob(response.data.token.split(".")[1]));
    await AsyncStorage.setItem("erp_token", response.data.token);
    await AsyncStorage.setItem("erp_token_expiration", payload["exp"]);
    await AsyncStorage.setItem("erp_user_id", payload["sub"]);
    await AsyncStorage.setItem("erp_username", username);
    await AsyncStorage.setItem("erp_password", encode(password));

    return true;
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
// export const execute = async (model, method, args) =>
//   jsonRpcRequest("object", "execute_kw", [
//     config.uid,
//     config.password,
//     model,
//     method,
//     ...args,
//   ]);

// export const execute = async (model, method, args) =>
//   jsonRpcRequest("object", "execute", [
//     config.uid,
//     config.pwd,
//     model,
//     method,
//     ...args,
//   ]);

export const read = async (model, id, fields) => {
  try {
    const response = await axios.get(`/rest/models/${model}/${id}`, {
      baseURL: config.workspace.erp.url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getToken()}`,
      },
      params: {
        fields: fields.joint(","),
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
