import { getObject, jsonrpcRequest } from "../api/apiClient";
import config from "../api/config";
import { formatOdooEvents } from "../.././src/utils/MarkedDatesFormatage";

// Fetch connected user data, children, and selected child
export const getConnectedUserData = async (
  setConnectedUser,
  setChildrenList,
  setSelectedChild
) => {
  try {
    const connectedUser = await getObject("connectedUser");
    if (connectedUser) {
      setConnectedUser(connectedUser);
      const childrenList = await getObject("children");
      setChildrenList(childrenList);
      const selectedChild = await getObject("selectedChild");
      setSelectedChild(selectedChild);
    }
  } catch (error) {
    console.error("Error while getting connectedUser:", error);
  }
};

// Fetch events based on connected user role
export const fetchOdooEvents = async (
  connectedUser,
  selectedChild,
  setEvents
) => {
  try {
    if (
      !connectedUser ||
      !connectedUser.sessionId ||
      !connectedUser.password ||
      !connectedUser.userid
    ) {
      return;
    }
    let domain = [];
    switch (connectedUser?.role) {
      case "parent":
        if (!selectedChild?.contact_id) return;
        domain = [["partner_ids", "=", selectedChild?.contact_id[0]]];
        break;
      case "student":
        domain = [["partner_ids", "=", connectedUser?.partnerid[0]]];
        break;
      default:
        console.error("Unsupported role:", connectedUser?.role);
        return;
    }
    const eventsData = await jsonrpcRequest(
      connectedUser?.sessionId,
      connectedUser?.password,
      config.model.craftSession,
      [domain],
      [
        "classroom_id",
        "recurrency",
        "rrule",
        "start",
        "stop",
        "subject_id",
        "teacher_id",
        "description",
      ]
    );
    setEvents(eventsData);
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

// Process and format the Odoo events into marked dates
export const processMarkedDates = (events, setMarkedDate) => {
  const formattedOdooEvents = formatOdooEvents(events);
  setMarkedDate(formattedOdooEvents);
};
