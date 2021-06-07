const dotenv = require("dotenv");

dotenv.config();

const serverSettings = {
  port: process.env.PORT || 3000,
};

const dbSettings = {
  database: process.env.DB,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
};

const oktaSettings = {
  clientId: process.env.OKTA_CLIENTID || "0oaw7lj4rmri5OW9x5d6",
  clientSecret:
    process.env.OKTA_CLIENTSECRET || "_tsTJTcelb1WvbeiRIGYfVd-yOhtSw0fnk-2V5MO",
  url: process.env.OKTA_URL_BASE || "https://dev-07553673.okta.com",
  apiToken: process.env.OKTA_API_TOKEN || "TODOAPP",
  appBaseUrl: process.env.OKTA_APP_BASE_URL || "http://localhost:3000",
};

module.exports = Object.assign(
  {},
  { dbSettings, serverSettings, oktaSettings },
);
