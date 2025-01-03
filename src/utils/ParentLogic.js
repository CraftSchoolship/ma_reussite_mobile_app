import { storeObject, storeArray } from "../api/apiClient";
import { browse } from "../../http/http";
import config from "../../http/config";

// Utility function to wrap profile image base64
const wrapProfileImageBase64 = (profileImage) => {
  if (!profileImage || typeof profileImage !== "string")
    return `${config.baseUrl}/base/static/img/avatar.png`;

  if (profileImage.startsWith("iVBORw0K"))
    return `data:image/png;base64,${profileImage}`;

  if (profileImage.startsWith("/9j/"))
    return `data:image/jpeg;base64,${profileImage}`;

  if (profileImage.startsWith("PHN2Zy") || profileImage.startsWith("PD94bWwg"))
    return `data:image/svg+xml;base64,${profileImage}`;

  console.log("Unknown image type");
  return `${config.baseUrl}/base/static/img/avatar.png`;
};

// Fetch currencies
export const getCurrencies = async () => {
  try {
    const currencies = await browse("res.currency", ["id", "symbol"]);
    await storeObject("currencies", currencies);
  } catch (error) {
    console.error("Error fetching currencies:", error);
  }
};

// Fetch parent data and their children
export const loadParentData = async (connectedUser) => {
  try {
    const fetchedChildren = await browse(
      "craft.parent.child.line",
      ["child_id"],
      { parent_id: connectedUser.craft_parent_id[0] }
    );

    const studentIds = fetchedChildren.map((child) => child.child_id[0]);
    const childrenList = await browse(
      "craft.student",
      ["id", "name", "contact_id", "image_256"],
      { id_in: studentIds.join(",") }
    );

    // Wrap image data into base64
    childrenList.forEach(
      (child) => (child.image_256 = wrapProfileImageBase64(child.image_256))
    );

    const initialSelectedChild = childrenList.length ? childrenList[0] : null;

    // Store children and selected child data
    await storeArray("children", childrenList);
    await storeObject("selectedChild", initialSelectedChild);
  } catch (error) {
    console.error("Error fetching parent data:", error);
  }
};
