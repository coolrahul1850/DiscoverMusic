// Load the client interfaces for the YouTube Analytics and Data APIs, which
// are required to use the Google APIs JS client. More info is available at
// http://code.google.com/p/google-api-javascript-client/wiki/GettingStarted#Loading_the_Client
function loadAPIClientInterfaces() {
  gapi.client.setApiKey('AIzaSyBTAYeSjhHStUC7HQBhTtfod3NsLatbJ1Q');
  gapi.client.load('youtube', 'v3', function() {
    handleAPILoaded();
  });
}