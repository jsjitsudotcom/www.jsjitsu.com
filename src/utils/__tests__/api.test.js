import Api from "./../api";
import feedsData from "./__data__/feed.json";
import fetchMock from "fetch-mock";

describe("Api tests suite", () => {
  it("Doit retourner les contenus", () => {
    fetchMock.get("*", feedsData);

    return Api.getFeeds("https://news.ycombinator.com/Api").then(source => {
      expect(source.feeds).toHaveLength(30);
      expect(source.description).toBeTruthy();
      expect(source.link).toBeTruthy();
      expect(source.title).toBeTruthy();
      fetchMock.restore();
    });
  });
  it("Doit retourner une erreur", () => {
    fetchMock.get("*", { body: { message: "Error" }, status: 400 });

    return Api.getFeeds("https://news.ycombinator.com/Api").catch(error => {
      expect(error.message).toEqual("Error");
    });
  });
});
