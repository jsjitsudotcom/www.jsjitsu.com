import json from "./../__tests__/__data__/feed.json";

const RSS = {
  fetchFeeds: () => Promise.resolve(json),
  fetchSource(source, url) {
    return RSS.fetchFeeds(url).then(rss => {
      return rss.feeds;
    });
  }
};

export default RSS;
