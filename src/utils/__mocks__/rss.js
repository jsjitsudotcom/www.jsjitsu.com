import json from "./../__tests__/__data__/feed.json";

const RSS = {
  fetchFeeds: () => Promise.resolve(json),
  fetchSource(source, url) {
    return RSS.fetchFeeds(url).then(rss => {
      return {
        feeds: rss.feeds,
        link: rss.link,
        description: rss.description,
        title: rss.title
      };
    });
  }
};

export default RSS;
