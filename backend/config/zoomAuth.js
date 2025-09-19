// zoomAuth.js
import axios from "axios";

let cachedToken = null;
let tokenExpiry = null;

export async function getZoomAccessToken() {
  const now = Math.floor(Date.now() / 1000);

  // Reuse token if it's still valid
  if (cachedToken && tokenExpiry && now < tokenExpiry) {
    return cachedToken;
  }

  const res = await axios.post(
    "https://zoom.us/oauth/token",
    null,
    {
      params: {
        grant_type: "account_credentials",
        account_id: process.env.ACCOUNT_ID,
      },
      auth: {
        username: process.ennv.CLIENT_ID,
        password: process.env.CLIENT_SECRET,
      },
    }
  );

  cachedToken = res.data.access_token;
  tokenExpiry = now + res.data.expires_in - 60; // refresh 1 min early

  return cachedToken;
}
