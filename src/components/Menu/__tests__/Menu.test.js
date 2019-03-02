import React from "react";
import { expect } from "chai";
import { Provider } from "react-redux";
import fetchMock from "fetch-mock";
import sinon from "sinon";

import { splitEvery } from "ramda";

import { mount, shallow } from "enzyme";
import createStore from "./../../../stores";
import Menu from "./../Menu";
import actions from "./../../../actions";

describe("<Menu />", () => {
  it("Le composant doit être rendu avec mount", () => {
    shallow(<Menu />);
  });

  it("Doit afficher le titre dans le Header", async () => {
    let data, message, expected;

    const title = "title";
    const wrapper = shallow(<Menu title={title} />);

    const getHeader = () => wrapper.update().find("Header");
    const getTitle = () => getHeader().prop("title");

    data = getTitle();
    expected = title;
    message = "Le titre doit bien être envoyé en props";
    expect(data).to.eq(expected, message);
  });

  it("Doit ouvrir/fermer le menu lors du clique sur le Header", async () => {
    let data, message, expected;

    const wrapper = shallow(<Menu />);

    const getHeader = () => wrapper.update().find("Header");
    const getMenuState = () => getHeader().prop("isMenuOpen");
    const toggleHeader = () => getHeader().prop("onMenu")();

    data = getMenuState();
    expected = false;
    message = "Par défaut, le menu est fermé";
    expect(data).to.eq(expected, message);

    toggleHeader();

    data = getMenuState();
    expected = true;
    message = "Le menu doit être ouvert";
    expect(data).to.eq(expected, message);

    toggleHeader();

    data = getMenuState();
    expected = false;
    message = "Le menu doit être fermé";
    expect(data).to.eq(expected, message);
  });

  it("Doit fermer le menu lors du clique sur les Tabs", async () => {
    let data, message, expected;

    const wrapper = shallow(<Menu />);

    const getHeader = () => wrapper.update().find("Header");
    const getTabs = () => wrapper.update().find("Tabs");
    const getMenuState = () => getTabs().prop("open");
    const toggleHeader = () => getHeader().prop("onMenu")();
    const toggleTabs = () => getTabs().prop("onClose")();

    data = getMenuState();
    expected = false;
    message = "Par défaut, le menu est fermé";
    expect(data).to.eq(expected, message);

    toggleHeader();

    data = getMenuState();
    expected = true;
    message = "Le menu doit être ouvert";
    expect(data).to.eq(expected, message);

    toggleTabs();

    data = getMenuState();
    expected = false;
    message = "Le menu doit être fermé";
    expect(data).to.eq(expected, message);
  });
});
