import React from "react";
import { expect } from "chai";
import { Provider } from "react-redux";
import fetchMock from "fetch-mock";
import sinon from "sinon";

import { splitEvery } from "ramda";

import { mount, shallow } from "enzyme";
import createStore from "./../../../stores";
import { Component as Discover } from "./../Discover";
import actions from "./../../../actions";

import seriesData from "./../../../__data__/series.parsed.json";

const mountWithProvider = ({ store = createStore(), props = {} } = {}) => {
  return mount(
    <Provider store={store}>
      <Discover {...props} />
    </Provider>
  );
};

describe("<Discover.Container />", () => {
  it("Le composant doit être rendu avec mount", () => {
    mountWithProvider();
  });

  it("Doit afficher les séries", async () => {
    let data, message, expected;

    const wrapper = shallow(<Discover series={seriesData} />);

    data = wrapper.find("Serie").exists();
    expected = true;
    message = "Les séries doivent s'afficher";

    data = wrapper.find("Serie").prop("illustration");
    expected = seriesData[0].illustration;
    message = "L'illustration doit bien être envoyé à la Serie";

    data = wrapper.find("Serie").prop("name");
    expected = seriesData[0].name;
    message = "Le name doit bien être envoyé à la Serie";

    expect(data).to.eq(expected, message);
  });
});
