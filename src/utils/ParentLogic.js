import { browse } from "../../http/http";
import config from "../../http/config";

const wrapProfileImageBase64 = (profileImage) => {
  if (!profileImage || typeof profileImage !== "string")
    return `${config.baseUrl}/base/static/img/avatar.png`;

  if (profileImage.startsWith("iVBORw0K"))
    return `data:image/png;base64,${profileImage}`;

  if (profileImage.startsWith("/9j/"))
    return `data:image/jpeg;base64,${profileImage}`;

  if (profileImage.startsWith("PHN2Zy") || profileImage.startsWith("PD94bWwg"))
    return `data:image/svg+xml;base64,${profileImage}`;

  return `${config.baseUrl}/base/static/img/avatar.png`;
};

export const getCurrencies = async () => {
  try {
    return await browse("res.currency", ["id", "symbol"]);
  } catch (error) {
    console.error("Error fetching currencies:", error);
    return [];
  }
};

export const loadParentData = async (connectedUser) => {
  try {
    const fetchedChildren = await browse(
      "craft.parent.child.line",
      ["child_id"],
      { parent_id: connectedUser.craft_parent_id[0] }
    );

    const studentIds = fetchedChildren.map((child) => child.child_id[0]);
    if (studentIds.length === 0) return { childrenList: [], selectedChild: null };

    const childrenList = await browse(
      "craft.student",
      ["id", "name", "contact_id", "image_256"],
      { id_in: studentIds.join(",") }
    );

    childrenList.forEach(
      (child) => (child.image_256 = wrapProfileImageBase64(child.image_256))
    );

    const initialSelectedChild = childrenList.length ? childrenList[0] : null;

    return { childrenList, selectedChild: initialSelectedChild };
  } catch (error) {
    console.error("Error fetching parent data:", error);
    return { childrenList: [], selectedChild: null };
  }
};
