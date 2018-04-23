import fetchMock from "fetch-mock";
import nock from "nock";
import sinon from "sinon";
import client, {
  getSeries,
  getEpisodes,
  getCategories
} from "./../content-full";

import episodes from "./../../__data__/episodes.json";
import categories from "./../../__data__/categories.json";
import series from "./../../__data__/series.json";

describe("Suite de tests de content-full", () => {
  beforeEach(() => {
    client.getEntries = () => {
      throw new Error("Contentfull doit être mocké");
    };
  });

  it("Doit bien mocker la requête", () => {
    client.getEntries = sinon.stub().resolves({});

    return getSeries().then(response => {
      expect(response).toEqual([]);
    });
  });

  it("Doit bien parser les séries", () => {
    client.getEntries = sinon.stub().resolves(series);

    return getSeries().then(response => {
      expect(response.length > 0).toEqual(true);
      expect(response[0].id).toBeTruthy();
      expect(response[0].name).toBeTruthy();
      expect(response[0].description).toBeTruthy();
      expect(response[0].illustration).toBeTruthy();
      expect(response[0].categories).toBeTruthy();
      expect(response[0].categories.length > 0).toBeTruthy();
    });
  });

  it("Doit bien parser les episodes", () => {
    client.getEntries = sinon.stub().resolves(episodes);

    return getEpisodes().then(response => {
      expect(response.length > 0).toEqual(true);
      expect(response[0].id).toBeTruthy();
      expect(response[0].title).toBeTruthy();
      expect(response[0].description).toBeTruthy();
      expect(response[0].illustration).toBeTruthy();
      expect(response[0].source).toBeTruthy();
    });
  });

  it("Doit bien parser les catégories", () => {
    client.getEntries = sinon.stub().resolves(categories);

    return getCategories().then(response => {
      expect(response.length > 0).toEqual(true);
      expect(response[0].id).toBeTruthy();
      expect(response[0].name).toBeTruthy();
    });
  });
});
