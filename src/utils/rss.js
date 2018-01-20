import config from "./../config";

const RSS = {
  fetchFeeds: /* istanbul ignore next */ url => {
    const endpoint = `${config.RSS_ENDPOINT}/feeds?url=${url}`;
    return fetch(endpoint).then(response => response.json());
  },
  fetchSource(url) {
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
