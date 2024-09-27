import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "./config";

// Create an axios instance
const odooApi = axios.create({
  baseURL: config.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

const jsonRpcRequest = async (service, method, args) => {
  try {
    console.log("calling rpc with args:");
    console.log(args);

    const response = await odooApi.post("/jsonrpc", {
      jsonrpc: "2.0",
      method: "call",
      params: {
        service: service,
        method: method,
        args: [config.database, ...args],
      },
      id: new Date().getTime(),
    });
    if ("error" in response.data) throw response.data.error;
    return response.data.result;
  } catch (error) {
    console.error("Remote Procedure Calling Failed", error);
    throw error;
  }
};

// Authentication function
export const authenticate = async (username, password) => {
  try {
    const uid = await jsonRpcRequest("common", "login", [username, password]);
    if (uid) {
      config.uid = uid;
      config.pwd = password;
      await AsyncStorage.setItem("userId", uid.toString());
      await AsyncStorage.setItem("username", username);
      return uid;
    } else {
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
    await AsyncStorage.removeItem("userId");
    await AsyncStorage.removeItem("username");
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export const execute = async (model, method, args) =>
  jsonRpcRequest("object", "execute", [
    config.uid,
    config.pwd,
    model,
    method,
    ...args,
  ]);

export const read = async (model, ids, fields) =>
  execute(model, "read", [ids, fields]);

export const browse = async (
  model,
  fields,
  domain_filters = [],
  offset = 0,
  limit = undefined,
  order = undefined
) =>
  execute(model, "search_read", [domain_filters, fields, offset, limit, order]);
export const create = async (model, record) =>
  execute(model, "create", [record]);
export const update = async (model, id, record) =>
  execute(model, "write", [[id], record]);
export const remove = async (model, id) => execute(model, "unlink", [[id]]);
