import createStore from "./../index";
import actions from "./../../actions";
import fetchMock from "fetch-mock";

describe("Suite de tests des articles", () => {
  it("Doit ajouter un nouvel article au reducer", () => {
    const store = createStore();

    const url = "http://echojs.com/mon-article";

    store.dispatch(actions.articles.storeArticle(url));

    const state = store.getState();

    const article = state.articles[url];

    expect(article.url).toEqual(url);
  });

  it("Doit ajouter des informations à l'article", () => {
    const store = createStore();

    const url = "http://echojs.com/mon-article";
    const title = "Je suis une poule";
    const text = "<p>Hello ma poule !</p>";

    store.dispatch(actions.articles.storeArticle(url));

    store.dispatch(
      actions.articles.updateArticle(url, {
        title,
        text
      })
    );

    const state = store.getState();

    const article = state.articles[url];

    expect(article.url).toEqual(url);
    expect(article.title).toEqual(title);
    expect(article.text).toEqual(text);
  });

  it("Doit sélectionner/déselectionner un article", () => {
    const store = createStore();

    const url = "http://echojs.com/mon-article";

    store.dispatch(actions.articles.storeArticle(url));
    store.dispatch(actions.articles.selectArticle(url));

    expect(store.getState().articles.selected).toEqual(url);

    store.dispatch(actions.articles.unselectArticle());

    expect(store.getState().articles.selected).toEqual(false);
  });

  it("Doit modifier fetching d'un article", () => {
    const store = createStore();
    const getFetching = url => store.getState().articles[url].fetching;
    const url = "http://echojs.com/mon-article";

    store.dispatch(actions.articles.storeArticle(url));
    store.dispatch(actions.articles.fetching(url));

    expect(getFetching(url)).toEqual(true);

    store.dispatch(actions.articles.fetchEnd(url));

    expect(getFetching(url)).toEqual(false);
  });

  describe("Suite de tests asynchrones", () => {
    afterEach(() => {
      fetchMock.restore();
    });

    it("Doit ajouter un nouvel article au reducer", done => {
      const store = createStore();

      const url = "http://echojs.com/mon-article";
      const title = "Je suis une poule";
      const text = "<p>Hello ma poule !</p>";

      fetchMock.get("*", { title, url, text });

      store
        .dispatch(
          actions.articles.fetchAndStoreArticle("http://echojs.com/mon-article")
        )
        .then(() => {
          const state = store.getState();

          const article = state.articles[url];

          expect(article.url).toEqual(url);
          expect(article.title).toEqual(title);
          expect(article.text).toEqual(text);
          expect(article.fetching).toEqual(false);

          return done();
        });

      const state = store.getState();
      const article = state.articles[url];

      expect(article.fetching).toEqual(true);
    });
  });

  // it("should add articles to a source", () => {
  //   const store = createStore();
  //   store.dispatch(actions.articles.addSource("Echojs"));
  //   store.dispatch(actions.articles.addarticles("Echojs", [{ link: 1 }]));

  //   const state = store.getState();
  //   expect(state.articles.sources["Echojs"].articles).toEqual([{ link: 1 }]);
  // });

  // it("should add articles and remove doublons", () => {
  //   const store = createStore();
  //   store.dispatch(actions.articles.addSource("Echojs"));
  //   store.dispatch(actions.articles.addarticles("Echojs", [{ link: 1 }]));
  //   store.dispatch(
  //     actions.articles.addarticles("Echojs", [{ link: 1 }, { link: 2 }])
  //   );

  //   const state = store.getState();
  //   expect(state.articles.sources["Echojs"].articles).toEqual([
  //     { link: 1 },
  //     { link: 2 }
  //   ]);
  // });

  // it("should select source", () => {
  //   const store = createStore();
  //   store.dispatch(actions.articles.addSource("Echojs"));
  //   store.dispatch(actions.articles.selectSource("Echojs"));

  //   const state = store.getState();
  //   expect(state.articles.selected).toEqual("Echojs");
  // });

  // it("should fetch articles from source when selected and no articles are in reducer", done => {
  //   const store = createStore();
  //   store.dispatch(
  //     actions.articles.addSource("Echojs", "http://www.echojs.com/rss")
  //   );
  //   store.dispatch(actions.articles.selectSource("Echojs"));

  //   store.dispatch(actions.articles.fetchSource("Echojs")).then(() => {
  //     const state = store.getState();
  //     expect(state.articles.selected).toEqual("Echojs");
  //     expect(state.articles.sources["Echojs"].articles).toHaveLength(30);
  //     return done();
  //   });

  //   const state = store.getState();
  //   expect(state.articles.sources["Echojs"].fetching).toBeTruthy();
  // });

  // it("should not fetch articles from source when articles are already in source", done => {
  //   const store = createStore();
  //   store.dispatch(
  //     actions.articles.addSource("Echojs", "http://www.echojs.com/rss")
  //   );
  //   store.dispatch(actions.articles.selectSource("Echojs"));
  //   store.dispatch(
  //     actions.articles.addarticles("Echojs", [{ link: 1 }, { link: 2 }])
  //   );

  //   store.dispatch(actions.articles.fetchSource("Echojs")).then(() => {
  //     const state = store.getState();
  //     expect(state.articles.selected).toEqual("Echojs");
  //     expect(state.articles.sources["Echojs"].articles).toHaveLength(2);
  //     return done();
  //   });

  //   const state = store.getState();
  //   expect(state.articles.sources["Echojs"].fetching).toBeFalsy();
  // });
});
