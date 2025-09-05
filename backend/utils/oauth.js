const dotenv = require('dotenv');
const axios = require("axios");
const { google } = require('googleapis');
dotenv.config();

const googleCredentials = new google.auth.OAuth2(
  process.env.CLIENT_APP_ID,
  process.env.CLIENT_APP_SECRET,
  'postmessage'
)

// Google's OAuth 2.0 endpoint for requesting an access token
// const google_auth_token_endpoint = 'https://ac counts.google.com/o/oauth2/v2/auth';
// const google_access_token_endpoint = 'https://oauth2.googleapis.com/token';

// const query_params = {
//   client_id: process.env.CLIENT_APP_ID,
//   redirect_uri: `http://localhost:5173`,
// };

// This object contains information that will be passed as query params to the auth token endpoint
// const auth_token_params = new URLSearchParams({
//   ...query_params,
//   response_type: 'code',
// }); 

// // The scopes (portion of user's data) we want to access - FIXED: Added Gmail scope
// const scopes = [
//   'profile', 
//   'email', 
//   'openid',
//   // 'https://mail.google.com/'  // This is the key addition for IMAP access
// ];

// A URL formed with the auth token endpoint and the params
// const request_get_auth_code_url = `${google_auth_token_endpoint}?${auth_token_params.toString()}&scope=${encodeURIComponent(scopes.join(' '))}&access_type=offline&prompt=consent`;

// console.log(`Redirect URI: http://localhost:5000${process.env.REDIRECT_URI}`);
// console.log(`Auth URL: ${request_get_auth_code_url}`);

// const get_access_token = async (auth_code) => {
//   const access_token_params = new URLSearchParams({
//     ...query_params,
//     client_secret: process.env.CLIENT_APP_SECRET,
//     code: auth_code,
//     grant_type: 'authorization_code',
//   });

//   try {
//     const response = await axios({
//       method: 'post',
//       url: `${google_access_token_endpoint}?${access_token_params.toString()}`,
//     });
    
//     // Log the scopes in the response for debugging
//     console.log('Access token obtained with scopes:', response.data.scope);
    
//     return response.data;
//   } catch (error) {
//     console.error('Error getting access token:', error.response?.data || error.message);
//     throw error;
//   }
// };

const get_access_token = async(code) => {
  const { tokens } = await googleCredentials.getToken(code);
  googleCredentials.setCredentials(tokens);

  const userInfo = await axios.get(
    `https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${tokens.access_token}`,
  )
  const { email , name , picture } = userInfo.data;

  return {access_token: tokens.access_token, refresh_token: tokens.refresh_token, expires_in: tokens.expiry_date, email, name, picture};
}

module.exports = {  get_access_token };