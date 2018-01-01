import rssParser from "rss-parser";
import Promise from "bluebird";

export const fetchFeeds = url => {
  return new Promise((resolve, reject) => {
    return rssParser.parseURL(url, (err, parsed) => {
      if (err) return reject(err);
      return resolve(parsed);
    });
  });
};

export const fetchSource = (source, url) => {
  
};