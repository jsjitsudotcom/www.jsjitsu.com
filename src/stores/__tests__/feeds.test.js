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
    store.dispatch(actions.feeds.addFeeds("Echojs", [{ id: 1 }]));

    const state = store.getState();
    expect(state.feeds.sources["Echojs"].feeds).toEqual([{ id: 1 }]);
  });

  it("should add feeds and remove doublons", () => {
    const store = createStore();
    store.dispatch(actions.feeds.addSource("Echojs"));
    store.dispatch(actions.feeds.addFeeds("Echojs", [{ id: 1 }]));
    store.dispatch(actions.feeds.addFeeds("Echojs", [{ id: 1 }, { id: 2 }]));

    const state = store.getState();
    expect(state.feeds.sources["Echojs"].feeds).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it("should select source", () => {
    const store = createStore();
    store.dispatch(actions.feeds.addSource("Echojs"));
    store.dispatch(actions.feeds.selectSource("Echojs"));

    const state = store.getState();
    expect(state.feeds.selected).toEqual("Echojs");
  });
});
