import AsyncStorage from "@react-native-async-storage/async-storage";
import { read } from "../../http/http";
import { storeObject } from "../api/apiClient";
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

  console.log("Unknown image type");
  return `${config.baseUrl}/base/static/img/avatar.png`;
};

export const authenticate = async (auth, ...args) => {
  const isAuthenticated = await auth(...args);

  if (!isAuthenticated)
    return { success: false, error: "Authentication failed." };

  const token = await AsyncStorage.getItem("erp_token");
  const user_id = await AsyncStorage.getItem("erp_user_id");

  if (!token || !user_id)
    return { success: false, error: "Invalid token or user ID." };

  const user = await read(
    "res.users",
    [user_id],
    [
      "self",
      "name",
      "phone",
      "login",
      "street",
      "craft_role",
      "craft_parent_id",
      "craft_student_id",
      "avatar_128",
    ]
  );

  if (!user) return { success: false, error: "User data not found." };

  const profileImage = user.avatar_128 || null;
  const connectedUser = {
    ...user,
    profileImage: wrapProfileImageBase64(profileImage),
    role: user.craft_role,
  };

  await storeObject("connectedUser", connectedUser);

  return { success: true, connectedUser };
};
