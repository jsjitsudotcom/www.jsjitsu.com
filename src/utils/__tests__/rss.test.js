import { fetchSource } from "./../rss";

describe("rss tests suite", () => {
  it("should return feeds from source", () => {
    return fetchSource("Hacker News", "https://news.ycombinator.com/rss").then((source) => {
      expect(source.name).toEqual("Hacker News");
      expect(source.feeds).toHaveLength(30);
    })
  });
});
