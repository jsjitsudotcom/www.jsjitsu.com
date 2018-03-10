import config from "./../config";

export default {
  getFeeds(source) {
    return fetch(`${config.RSS_ENDPOINT}/feeds/${source}`).then(response => {
      if (response.ok) return response.json();
      return response.json().then(e => Promise.reject(e));
    });
  }
};
