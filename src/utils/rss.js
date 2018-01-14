import rssParser from "rss-parser";
import Promise from "bluebird";
import { RSS_ENDPOINT } from "./../config";

const RSS = {
  fetchFeeds: /* istanbul ignore next */ (url) => {  
    return new Promise((resolve, reject) => {
      return rssParser.parseURL(`${RSS_ENDPOINT}/feeds?url=${url}`, (err, parsed) => {
        if (err) return reject(err);
        return resolve(parsed);
      });
    });
  },
  fetchSource(url) {
    return RSS.fetchFeeds(url).then(rss => {
      return {
        feeds: rss.feed.entries,
        link: rss.feed.link,
        description: rss.feed.description,
        title: rss.feed.title
      };
    });
  }
};

export default RSS;
