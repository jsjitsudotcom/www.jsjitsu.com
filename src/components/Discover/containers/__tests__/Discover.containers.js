import React from "react";
import { expect } from "chai";
import { Provider } from "react-redux";
import fetchMock from "fetch-mock";
import sinon from "sinon";

import { splitEvery } from "ramda";

import contentFullMock from "./../../../../utils/content-full";

import { mount } from "enzyme";
import createStore from "./../../../../stores";
import Container from "./../Discover";
import actions from "./../../.../../../../actions";

import series from "./../../../../__data__/series.json";

const mountWithProvider = (store, props = {}) => {
  const Tester = props => <div />;
  const Connected = Container(Tester);

  const wrapper = mount(
    <Provider store={store}>
      <Connected {...props} />
    </Provider>
  );

  wrapper.getTester = () => wrapper.find("Tester");

  return wrapper;
};

const getProp = (wrapper, prop) =>
  wrapper
    .update()
    .getTester()
    .prop(prop);

describe("<Discover.Container />", () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  it("Le composant doit être rendu avec mount", () => {
    mountWithProvider(createStore());
  });

  it("Les nouvelles séries doivent être récupérée", async () => {
    contentFullMock.getEntries = sinon.stub().resolves(series);

    const wrapper = mountWithProvider(createStore());

    await wrapper.getTester().prop("fetchSeries")();

    let data, message, expected;

    data = getProp(wrapper, "series").length;
    expected = 1;
    message = "Les séries doivent se trouver dans le reducer";

    expect(data).to.eq(expected, message);
  });

  describe.skip("Suite de tests de getEvents()", () => {
    it("Les évènements doivent être récupérés", () => {
      fetchMock.get(url => url.indexOf("events") > -1, {
        events: eventsData,
        next: null
      });

      const wrapper = mountWithProvider(createStore());

      return wrapper
        .prop("getEvents")()
        .then(() => {
          expect(wrapper.prop("events").length).to.eq(eventsData.length);
        });
    });

    it("Si le serveur ne renvoie pas de next, alors la recherche est fini", () => {
      fetchMock.get(url => url.indexOf("events") > -1, {
        events: eventsData,
        next: null
      });

      const wrapper = mountWithProvider(createStore());

      return wrapper
        .prop("getEvents")()
        .then(() => {
          expect(wrapper.prop("isFinished")).to.eq(true);
        });
    });

    it("Si le serveur renvoie deux fois le même next, alors c'est fini", async () => {
      const next = new Date();

      fetchMock.get(url => url.indexOf("events") > -1, {
        events: eventsData,
        next
      });

      const wrapper = mountWithProvider(createStore());

      await wrapper.prop("getEvents")();
      await wrapper.prop("getEvents")();

      expect(wrapper.prop("isFinished")).to.eq(true);
    });

    it("Doit récupérer des nouveaux évènements avec load more", async () => {
      const next = new Date();

      let data, expected, message;

      const middle = Math.floor(eventsData.length / 2);
      const [eventsFirst, eventsLast] = splitEvery(middle, eventsData);
      const response = sinon
        .stub()
        .onFirstCall()
        .returns({ events: eventsFirst, next })
        .returns({ events: eventsLast, next: null });

      fetchMock.get(url => url.indexOf("events") > -1, response);

      const wrapper = mountWithProvider(createStore());

      await wrapper.prop("getEvents")();
      await wrapper.prop("getEvents")();

      data = wrapper.prop("isFinished");
      expected = true;
      message = "La recherche doit être terminée";
      expect(data).to.eq(expected, message);

      data = wrapper.prop("events").length;
      expected = eventsData.length;
      message = "Tous les contenus doivent être stockés";
      expect(data).to.eq(expected, message);
    });
  });

  describe.skip("Suite de tests des live", () => {
    it("Doit aller récupérer des contenus live", async () => {
      fetchMock.get(url => url.indexOf("events") > -1, {
        events: eventsData,
        next: null
      });

      let data, expected, message;

      const store = createStore();
      const wrapper = mountWithProvider(store);

      await store.dispatch(actions.signal.fetchLiveEvents());

      data = wrapper.prop("hasLiveEvents");
      expected = true;
      message = "La recherche doit avoir des contenus en live";
      expect(data).to.eq(expected, message);

      data = wrapper.prop("liveEventsLength");
      expected = eventsData.length;
      message = "Les contenus doivent être stockés dans le live";
      expect(data).to.eq(expected, message);
    });

    it("Doit ajouter les contenus du live dans les contenus", async () => {
      fetchMock.get(url => url.indexOf("events") > -1, {
        events: eventsData,
        next: null
      });

      let data, expected, message;

      const store = createStore();
      const wrapper = mountWithProvider(store);

      await store.dispatch(actions.signal.fetchLiveEvents());
      wrapper.prop("showLiveEvents")();

      data = wrapper.prop("liveEventsLength");
      expected = 0;
      message = "Il ne plus y avoir de contenu en live length";
      expect(data).to.eq(expected, message);

      data = wrapper.prop("hasLiveEvents");
      expected = false;
      message = "Il ne plus y avoir de contenu en live";
      expect(data).to.eq(expected, message);

      data = wrapper.prop("events").length;
      expected = eventsData.length;
      message = "Les contenus doivent maintenant se trouver dans events";
      expect(data).to.eq(expected, message);
    });
  });
});
