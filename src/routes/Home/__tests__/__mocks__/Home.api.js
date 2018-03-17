import feeds from "./../__data__/feed.json";

export default {
  getFeeds(source) {
    return Promise.resolve(feeds);
  },

  getArticle(url) {
    return Promise.resolve({});
  }
};
