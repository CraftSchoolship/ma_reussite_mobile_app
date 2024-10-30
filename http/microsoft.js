import { authorize } from "react-native-app-auth";
const config = {
  issuer: "https://login.microsoftonline.com/{your-tenant-id}",
  clientId: "{your-client-id}",
  redirectUrl: "https://yourappname.expo.dev",
  scopes: ["openid", "profile", "email"],
  serviceConfiguration: {
    authorizationEndpoint:
      "https://login.microsoftonline.com/{your-tenant-id}/oauth2/v2.0/authorize",
    tokenEndpoint:
      "https://login.microsoftonline.com/{your-tenant-id}/oauth2/v2.0/token",
  },
};
async function microsoftSignIn() {
  try {
    const result = await authorize(config);
    console.log("Authorization Result:", result);
  } catch (error) {
    console.error("Authorization Error:", error);
  }
}
export default microsoftSignIn;
