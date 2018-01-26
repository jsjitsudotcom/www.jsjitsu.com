jest.mock("./../../utils/api");
import createStore from "./../index";
import actions from "./../../actions";

describe("feeds test suite", () => {
  it("should create a new source", () => {
    const store = createStore();
    store.dispatch(actions.feeds.addSource("Echojs", "http://echojs.com/rss"));

    const state = store.getState();
    const source = state.feeds.sources["Echojs"];

    expect(source).toBeTruthy();
    expect(source.name).toEqual("Echojs");
    expect(source.url).toEqual("http://echojs.com/rss");
    expect(source.feeds).toEqual([]);
  });

  it("should add feeds to a source", () => {
    const store = createStore();
    store.dispatch(actions.feeds.addSource("Echojs"));
    store.dispatch(actions.feeds.addFeeds("Echojs", [{ link: 1 }]));

    const state = store.getState();
    expect(state.feeds.sources["Echojs"].feeds).toEqual([{ link: 1 }]);
  });

  it("should add feeds and remove doublons", () => {
    const store = createStore();
    store.dispatch(actions.feeds.addSource("Echojs"));
    store.dispatch(actions.feeds.addFeeds("Echojs", [{ link: 1 }]));
    store.dispatch(
      actions.feeds.addFeeds("Echojs", [{ link: 1 }, { link: 2 }])
    );

    const state = store.getState();
    expect(state.feeds.sources["Echojs"].feeds).toEqual([
      { link: 1 },
      { link: 2 }
    ]);
  });

  it("should select source", () => {
    const store = createStore();
    store.dispatch(actions.feeds.addSource("Echojs"));
    store.dispatch(actions.feeds.selectSource("Echojs"));

    const state = store.getState();
    expect(state.feeds.selected).toEqual("Echojs");
  });

  it("should fetch feeds from source when selected and no feeds are in reducer", done => {
    const store = createStore();
    store.dispatch(
      actions.feeds.addSource("Echojs", "http://www.echojs.com/rss")
    );
    store.dispatch(actions.feeds.selectSource("Echojs"));

    store.dispatch(actions.feeds.fetchSource("Echojs")).then(() => {
      const state = store.getState();
      expect(state.feeds.selected).toEqual("Echojs");
      expect(state.feeds.sources["Echojs"].feeds).toHaveLength(30);
      return done();
    });

    const state = store.getState();
    expect(state.feeds.sources["Echojs"].fetching).toBeTruthy();
  });

  it("should not fetch feeds from source when feeds are already in source", done => {
    const store = createStore();
    store.dispatch(
      actions.feeds.addSource("Echojs", "http://www.echojs.com/rss")
    );
    store.dispatch(actions.feeds.selectSource("Echojs"));
    store.dispatch(
      actions.feeds.addFeeds("Echojs", [{ link: 1 }, { link: 2 }])
    );

    store.dispatch(actions.feeds.fetchSource("Echojs")).then(() => {
      const state = store.getState();
      expect(state.feeds.selected).toEqual("Echojs");
      expect(state.feeds.sources["Echojs"].feeds).toHaveLength(2);
      return done();
    });

    const state = store.getState();
    expect(state.feeds.sources["Echojs"].fetching).toBeFalsy();
  });
});
