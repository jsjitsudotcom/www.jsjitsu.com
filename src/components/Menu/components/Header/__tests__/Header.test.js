import React from "react";
import { shallow, mount } from "enzyme";
import { expect as chai } from "chai";
import sinon from "sinon";
import Header from "./../Header";

describe("<Header />", () => {
  it("Le componsant doit être rendu", () => {
    shallow(<Header />);
  });

  it("Vérification que toutes les props soient bien dans les propTypes", () => {
    const props = ["onClickMenu", "onClickSubmitFeed", "fixed"];
    const propTypes = Object.keys(Header.propTypes);

    chai(props).to.deep.eq(propTypes);
  });

  it("Doit afficher le titre et les tabs doivent être fermée", () => {
    const wrapper = shallow(<Header title="Hi" isMenuOpen={false} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("Doit afficher le titre et les tabs doivent être ouverte", () => {
    const wrapper = shallow(<Header title="Hello" isMenuOpen={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("Doit appeller la méthode onClick", () => {
    const spy = sinon.spy();
    const wrapper = shallow(<Header onMenu={spy} />);

    wrapper.find("Ripple").prop("onClick")();

    const data = spy.called;
    const expected = true;
    chai(data).to.eq(expected);
  });
});
