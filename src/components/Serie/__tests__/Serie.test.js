import React from "react";
import { mount, shallow } from "enzyme";
import { Provider } from "react-redux";
import fetchMock from "fetch-mock";
import sinon from "sinon";

import Serie from "./../Serie";

describe("<Serie />", () => {
  it("Le composant doit être rendu avec mount", () => {
    shallow(<Serie />);
  });

  it("Doit vérifier la bon affichage des props", async () => {
    const wrapper = shallow(<Serie illustration="illustration" name="name" />);
    expect(wrapper).toMatchSnapshot();
  });

  it("Doit appeller la méthode onClick", async () => {
    const spy = sinon.spy();
    const wrapper = shallow(<Serie onClick={spy} />);

    wrapper.find("Ripple").prop("onClick")();

    const data = spy.called;
    const expected = true;
    expect(data).toEqual(expected);
  });
});
