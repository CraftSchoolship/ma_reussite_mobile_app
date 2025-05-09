const config = {
  baseUrl: "https://ma-reussite.com",
  database: "bitnami_odoo",
  debug: false,
  auth: {
    providers: [
      {
        id: 4,
        name: "Microsoft",
        url: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?response_type=token&prompt=select_account&client_id=fca99774-c6c1-4649-acea-2732609fa2ab&redirect_uri=mareussite%3A%2F%2Foauth%2Fauth&scope=openid+profile+email&state=%7B%22d%22%3A+%22bitnami_odoo%22%2C+%22p%22%3A+4%7D",
      },
    ],
  },
  notification: {
    server: "https://notification.craftschoolship.com",
    scope_prefix: "ma-reussite:odoo:"
  },
  workspace: {
    erp: {
      url: "https://ma-reussite.com",
    },
  },
};
export default config;