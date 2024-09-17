import axios from "axios";
import config from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const url = config.baseUrl;
const db = config.database;

// Fonction d'authentification
const authenticate = async (
  username = config.username,
  password = config.password
) => {
  const authResponse = await axios.post(url, {
    jsonrpc: "2.0",
    method: "call",
    params: {
      service: "common",
      method: "login",
      args: [db, username, password],
    },
    id: Math.floor(Math.random() * 1000),
  });
  return authResponse.data.result;
};

// Fonction générique pour requêtes JSON-RPC (search_read)
const jsonrpcRequest = async (
  sessionId,
  password,
  model,
  constraints = [],
  fields = []
) => {
  const response = await axios.post(url, {
    jsonrpc: "2.0",
    method: "call",
    params: {
      service: "object",
      method: "execute_kw",
      args: [
        db,
        sessionId,
        password,
        model,
        "search_read",
        constraints,
        {
          fields: fields,
        },
      ],
    },
    id: Math.floor(Math.random() * 1000),
  });
  return response.data.result;
};

// Fonction pour créer un nouvel enregistrement
const createRecord = async (sessionId, password, model, data) => {
  const response = await axios.post(url, {
    jsonrpc: "2.0",
    method: "call",
    params: {
      service: "object",
      method: "execute_kw",
      args: [db, sessionId, password, model, "create", [data]],
    },
    id: Math.floor(Math.random() * 1000),
  });
  return response.data.result;
};

// Fonction pour mettre à jour un enregistrement existant
const updateRecord = async (sessionId, password, model, id, data) => {
  const response = await axios.post(url, {
    jsonrpc: "2.0",
    method: "call",
    params: {
      service: "object",
      method: "execute_kw",
      args: [db, sessionId, password, model, "write", [[id], data]],
    },
    id: Math.floor(Math.random() * 1000),
  });
  return response.data.result;
};

// Fonction pour supprimer un enregistrement
const deleteRecord = async (sessionId, password, model, id) => {
  const response = await axios.post(url, {
    jsonrpc: "2.0",
    method: "call",
    params: {
      service: "object",
      method: "execute_kw",
      args: [db, sessionId, password, model, "unlink", [[id]]],
    },
    id: Math.floor(Math.random() * 1000),
  });
  return response.data.result;
};

// Fonction pour un appel RPC personnalisé
const customRpcCall = async (sessionId, password, endpoint, params) => {
  const response = await axios.post(`${url}/${endpoint}`, {
    jsonrpc: "2.0",
    method: "call",
    params: {
      db: db,
      uid: sessionId,
      password: password,
      ...params,
    },
    id: Math.floor(Math.random() * 1000),
  });
  return response.data.result;
};

// Fonctions pour AsyncStorage

const storeString = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error("Error storing string:", e);
  }
};

const getString = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.error("Error retrieving string:", e);
  }
};

const storeObject = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error("Error storing object:", e);
  }
};

const getObject = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error retrieving object:", e);
  }
};

const storeArray = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error("Error storing array:", e);
  }
};

const getArray = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error retrieving array:", e);
  }
};

export {
  authenticate,
  jsonrpcRequest,
  createRecord,
  updateRecord,
  deleteRecord,
  customRpcCall,
  storeString,
  getString,
  storeObject,
  getObject,
  storeArray,
  getArray,
};
