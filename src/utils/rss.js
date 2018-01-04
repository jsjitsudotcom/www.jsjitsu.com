import rssParser from "rss-parser";
import Promise from "bluebird";

const RSS = {
  fetchFeeds: /* istanbul ignore next */ (url) => {  
    return new Promise((resolve, reject) => {
      return rssParser.parseURL(url, (err, parsed) => {
        if (err) return reject(err);
        return resolve(parsed);
      });
    });
  },
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
