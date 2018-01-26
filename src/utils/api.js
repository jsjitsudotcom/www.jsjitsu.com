import config from "./../config";

export default {
  makeRequest(source) {
    return fetch(`${config.RSS_ENDPOINT}/feeds/${source}`).then(response =>
      response.json()
    );
  },
  getFeeds(source) {
    return this.makeRequest(source);
  }
};
