import config from '../../http/config';
import { getToken, read } from '../../http/http';


export const is_authenticated = async () => {
  const isAuthenticatedInERP = await getToken();
  return isAuthenticatedInERP;
};

export const wrapProfileImageBase64 = (profileImage) => {
  if (!profileImage || typeof profileImage !== "string")
    return config.workspace.erp.url + "/base/static/img/avatar.png";

  if (profileImage.startsWith("iVBORw0K"))
    return `data:image/png;base64,${profileImage}`;

  if (profileImage.startsWith("/9j/"))
    return `data:image/jpeg;base64,${profileImage}`;

  if (profileImage.startsWith("PHN2Zy") || profileImage.startsWith("PD94bWwg"))
    return config.workspace.erp.url + "/base/static/img/avatar.png";

  return config.workspace.erp.url + "/base/static/img/avatar.png";
};

export const getUserInfo = async () => {
  await getToken();

  const user_id = config.workspace.erp.uid;
  const user = await read('res.users', user_id, [ 'self', 'name', 'phone', 'login', 'email', 'street', 'craft_role', 'craft_parent_id', 'craft_student_id', 'avatar_128']);

  if (!user || user.length === 0) {
    console.error('Invalid User info');
    return null;
  }

  return {
    ...user,
    avatar: wrapProfileImageBase64(user.avatar_128)
  };
};