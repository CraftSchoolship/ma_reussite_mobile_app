import axios from "axios";

// URL = "https://test.erp.craftschoolship.com"
// DB = "bitnami_odoo"
// user: test@example.com
// pwd: Temp4Now#
const ODOO_URL = "https://test.erp.craftschoolship.com/jsonrpc";
const DB = "bitnami_odoo";

const odooApi = axios.create({
  baseURL: ODOO_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const jsonRpcRequest = (_method, params) => ({
  jsonrpc: "2.0",
  method: "call",
  params,
  id: new Date().getTime(),
});

export const authenticate = async (username, password) => {
  const params = {
    service: "common",
    method: "authenticate",
    args: [DB, username, password, {}],
  };

  try {
    const response = await odooApi.post("/", jsonRpcRequest("call", params));
    return response.data.result;
  } catch (error) {
    console.error("Authentication failed", error);
    throw error;
  }
};

export const getPartners = async (uid, password) => {
  const params = {
    service: "object",
    method: "execute_kw",
    args: [
      DB,
      uid,
      password,
      "res.partner",
      "search_read",
      [
        [
          ["is_company", "=", true],
          ["customer", "=", true],
        ],
      ],
      { fields: ["name", "country_id", "comment"], limit: 5 },
    ],
  };

  try {
    const response = await odooApi.post("/", jsonRpcRequest("call", params));
    return response.data.result;
  } catch (error) {
    console.error("Failed to fetch partners", error);
    throw error;
  }
};

export const createPartner = async (uid, password, partnerData) => {
  const params = {
    service: "object",
    method: "execute_kw",
    args: [DB, uid, password, "res.partner", "create", [partnerData]],
  };

  try {
    const response = await odooApi.post("/", jsonRpcRequest("call", params));
    return response.data.result;
  } catch (error) {
    console.error("Failed to create partner", error);
    throw error;
  }
};

export const updatePartner = async (uid, password, partnerId, partnerData) => {
  const params = {
    service: "object",
    method: "execute_kw",
    args: [
      DB,
      uid,
      password,
      "res.partner",
      "write",
      [[partnerId], partnerData],
    ],
  };

  try {
    const response = await odooApi.post("/", jsonRpcRequest("call", params));
    return response.data.result;
  } catch (error) {
    console.error("Failed to update partner", error);
    throw error;
  }
};
