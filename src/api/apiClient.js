/* -------------------------------------------------------------------------- */
/*                                  VERSION 2                                 */
/* -------------------------------------------------------------------------- */

import axios from "axios";
import config from "./config";

const url = config.baseUrl;
const db = config.database;

// Fonction d'authentification prenant en charge les identifiants d'utilisateur
const authenticate = async (username, password) => {
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

const fetch = async (sessionId, password, model, fields) => {
  const eventsResponse = await axios.post(url, {
    jsonrpc: "2.0",
    method: "call",
    params: {
      service: "object",
      method: "execute_kw",
      args: [
        db,
        sessionId,
        password, // Password parameter replaced with null
        model,
        "search_read",
        [],
        {
          fields: fields,
        },
      ],
    },
    id: Math.floor(Math.random() * 1000),
  });
  return eventsResponse.data.result;
};

// Fonction pour récupérer la liste des partenaires
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
        null, // Password parameter replaced with null
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

// Fonction pour récupérer un partenaire par email
const fetchPartnerByEmail = async (sessionId, email, password) => {
  const partnerResponse = await axios.post(url, {
    jsonrpc: "2.0",
    method: "call",
    params: {
      service: "object",
      method: "execute_kw",
      args: [
        db,
        sessionId,
        password, // Password parameter replaced with null
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

// Fonction pour récupérer les événements du calendrier
const fetchCalendarEvents = async (sessionId, password) => {
  fetch(sessionId, password, config.model.calendar, [
    "id",
    "name",
    "start",
    "stop",
    "description",
  ]);
};

// Fonction pour filtrer les événements par meeting_ids du partenaire
const filterEventsByPartnerMeetings = (partner, events) => {
  const filteredEvents = [];
  partner?.meeting_ids?.forEach((id) => {
    events.forEach((event) => {
      if (event.id === id) {
        filteredEvents.push(event);
      }
    });
  });
  return filteredEvents;
};

const fetchOdooCourses = async (sessionId, password) =>
  fetch(sessionId, password, config.model.opCourse, ["id", "name", "code"]);

const fetchOdooSessions = async (sessionId, password) =>
  fetch(sessionId, password, config.model.opSession, [
    "id",
    "name",
    "classroom_id",
    "course_id",
    "subject_id",
    "timing",
  ]);

// Export des fonctions pour utilisation dans d'autres parties de votre application
export {
  authenticate,
  fetchPartners,
  fetchPartnerByEmail,
  fetchCalendarEvents,
  filterEventsByPartnerMeetings,
  fetchOdooCourses,
  fetchOdooSessions,
};

/* -------------------------------------------------------------------------- */
/*                                  VERSION 1                                 */
/* -------------------------------------------------------------------------- */
// import axios from "axios";
// import config from "./config";

// const url = config.baseUrl;
// const db = config.database;
// const username = config.username;
// const password = config.password;

// const authenticate = async () => {
//   const authResponse = await axios.post(url, {
//     jsonrpc: "2.0",
//     method: "call",
//     params: {
//       service: "common",
//       method: "login",
//       args: [db, username, password],
//     },
//     id: Math.floor(Math.random() * 1000),
//   });
//   return authResponse.data.result;
// };

// const fetchPartners = async (sessionId) => {
//   const partnerResponse = await axios.post(url, {
//     jsonrpc: "2.0",
//     method: "call",
//     params: {
//       service: "object",
//       method: "execute_kw",
//       args: [
//         db,
//         sessionId,
//         password,
//         config.model.student,
//         "search_read",
//         [],
//         { fields: ["name", "email"] },
//       ],
//     },
//     id: Math.floor(Math.random() * 1000),
//   });
//   return partnerResponse.data.result;
// };

// const fetchPartnerByEmail = async (sessionId, email) => {
//   const partnerResponse = await axios.post(url, {
//     jsonrpc: "2.0",
//     method: "call",
//     params: {
//       service: "object",
//       method: "execute_kw",
//       args: [
//         db,
//         sessionId,
//         password,
//         config.model.partner,
//         "search_read",
//         [[["email", "=", email]]],
//         { fields: ["id", "name", "email", "meeting_ids"] },
//       ],
//     },
//     id: Math.floor(Math.random() * 1000),
//   });
//   return partnerResponse.data.result;
// };

// const fetchCalendarEvents = async (sessionId) => {
//   const eventsResponse = await axios.post(url, {
//     jsonrpc: "2.0",
//     method: "call",
//     params: {
//       service: "object",
//       method: "execute_kw",
//       args: [
//         db,
//         sessionId,
//         password,
//         "calendar.event",
//         "search_read",
//         [],
//         // [[["active_id", "=", userId]]],
//         { fields: ["id", "name", "start", "stop", "description"] },
//       ],
//     },
//     id: Math.floor(Math.random() * 1000),
//   });
//   return eventsResponse.data.result;
// };
// const filterEventsByPartnerMeetings = (partner, events) => {
//   const filteredEvents = [];
//   partner?.meeting_ids?.forEach((id) => {
//     events.forEach((event) => {
//       if (event.id === id) {
//         filteredEvents.push(event);
//       }
//     });
//   });
//   return filteredEvents;
// };

// export {
//   authenticate,
//   fetchPartners,
//   fetchPartnerByEmail,
//   fetchCalendarEvents,
//   filterEventsByPartnerMeetings,
// };
