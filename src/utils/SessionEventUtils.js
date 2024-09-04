import { jsonrpcRequest } from "../api/apiClient";
import config from "../api/config";

export const getConnectedUserDetails = (route) => {
  const connectedUser = route?.params;
  const { sessionId, password, userid } = connectedUser;
  return { sessionId, password, userid: userid[0] };
};

export const fetchEventsData = async (sessionId, password, userid) => {
  try {
    const eventsData = await jsonrpcRequest(
      sessionId,
      password,
      config.model.craftSession,
      [[["partner_ids", "in", [userid]]]],
      ["classroom_id", "start", "stop", "subject_id", "teacher_id"]
    );
    return Array.isArray(eventsData) ? eventsData : [];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export const filterEventsByMonth = (events) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  return events.filter((event) => {
    const eventStart = new Date(event.start);
    return (
      eventStart.getFullYear() === currentYear &&
      eventStart.getMonth() === currentMonth
    );
  });
};

// export const filterEventsByMonth = (events) => {
//   return events; // Return all events without filtering by month
// };
