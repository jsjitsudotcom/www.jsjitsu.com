import json from "./../__tests__/__data__/feed.json";

const RSS = {
  fetchFeeds: () => Promise.resolve(json),
  getFeeds(source) {
    return RSS.fetchFeeds(source).then(rss => {
      return rss.feeds;
    });
  }
};

export default RSS;
