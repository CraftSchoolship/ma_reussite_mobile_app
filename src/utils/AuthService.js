import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken, read } from "../../http/http";
import config from "../../http/config";



export const is_authenticated = async () => {
  const isAuthenticatedInERP = await getToken();
  return isAuthenticatedInERP;
};

const wrapProfileImageBase64 = (profileImage) => {
  if (!profileImage || typeof profileImage !== "string")
    return `${config.baseUrl}/base/static/img/avatar.png`;

  if (profileImage.startsWith("iVBORw0K"))
    return `data:image/png;base64,${profileImage}`;

  if (profileImage.startsWith("/9j/"))
    return `data:image/jpeg;base64,${profileImage}`;

  if (profileImage.startsWith("PHN2Zy") || profileImage.startsWith("PD94bWwg"))
    return `${config.baseUrl}/base/static/img/avatar.png`;

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

  return { success: true, user_id };
};

export const getUserInfo = async () => {
  await getToken();

  const user_id = config.workspace.erp.uid;
  if (!user_id) return null;
  const user = await read("res.users", [user_id], [
    "self",
    "name",
    "phone",
    "login",
    "street",
    "craft_role",
    "craft_parent_id",
    "craft_student_id",
    "avatar_128",
  ]);

  if (!user) return null;

  return {
    ...user,
    profileImage: wrapProfileImageBase64(user.avatar_128),
    role: user.craft_role,
  };
  };