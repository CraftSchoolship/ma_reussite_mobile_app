import axios from "axios";
import config from "./config";

const url = config.baseUrl;
const db = config.database;
const username = config.username;
const password = config.password;

const authenticate = async () => {
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

const fetchPartners = async (sessionId) => {
  const partnerResponse = await axios.post(url, {
    jsonrpc: "2.0",
    method: "call",
    params: {
      service: "object",
      method: "execute_kw",
      args: [
        db,
        sessionId,
        password,
        config.model.student,
        "search_read",
        [],
        { fields: ["name", "email"] },
      ],
    },
    id: Math.floor(Math.random() * 1000),
  });
  return partnerResponse.data.result;
};

const fetchPartnerByEmail = async (sessionId, email) => {
  const partnerResponse = await axios.post(url, {
    jsonrpc: "2.0",
    method: "call",
    params: {
      service: "object",
      method: "execute_kw",
      args: [
        db,
        sessionId,
        password,
        config.model.partner,
        "search_read",
        [[["email", "=", email]]],
        { fields: ["id", "name", "email", "meeting_ids"] },
      ],
    },
    id: Math.floor(Math.random() * 1000),
  });
  return partnerResponse.data.result;
};

const fetchCalendarEvents = async (sessionId) => {
  const eventsResponse = await axios.post(url, {
    jsonrpc: "2.0",
    method: "call",
    params: {
      service: "object",
      method: "execute_kw",
      args: [
        db,
        sessionId,
        password,
        "calendar.event",
        "search_read",
        [],
        // [[["active_id", "=", userId]]],
        { fields: ["id", "name", "start", "stop", "description"] },
      ],
    },
    id: Math.floor(Math.random() * 1000),
  });
  return eventsResponse.data.result;
};

export {
  authenticate,
  fetchPartners,
  fetchPartnerByEmail,
  fetchCalendarEvents,
};
