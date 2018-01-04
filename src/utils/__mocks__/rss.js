import json from "./../__tests__/__data__/feed.json";

const RSS = {
  fetchFeeds: () => Promise.resolve(json),
  fetchSource(source, url) {
    return RSS.fetchFeeds(url).then(rss => {
      return {
        feeds: rss.feed.entries,
        name: source,
        link: rss.feed.link,
        description: rss.feed.description,
        title: rss.feed.title
      };
    });
  }
};

export default RSS;
