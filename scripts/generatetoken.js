const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');



// Load credentials from file
const credentialsPath = path.join(__dirname, 'credentials.json');
const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

// OAuth2 Client Setup
const { client_secret, client_id, redirect_uris } = credentials.web;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

// Generate the URL for the authentication consent page
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/gmail.send']
});

console.log('Authorize this app by visiting this URL:', authUrl);

// After visiting the URL, you'll receive an authorization code
// Use that code in the following section to get the access token

// Function to exchange the code for tokens
const getAccessToken = async (code) => {
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    console.log('Tokens acquired:', tokens);
    oAuth2Client.setCredentials(tokens);

    // Store your tokens securely, such as in the .env file
    fs.writeFileSync('.env', `ACCESS_TOKEN=${tokens.access_token}\nREFRESH_TOKEN=${tokens.refresh_token}`);
    console.log('Tokens saved to .env');
  } catch (error) {
    console.error('Error getting access token:', error);
  }
};

// Prompt the user to input the authorization code after visiting the URL
// Note: This part should be done after the user manually visits the URL, retrieves the code, and enters it here
getAccessToken('4%2F0Ab_5qlnsPYYVaXp_4AkeLBqQV7NKnuvYxliIRiSonJp4i8FVWnqgZD7eXQNuMFh5satptA');