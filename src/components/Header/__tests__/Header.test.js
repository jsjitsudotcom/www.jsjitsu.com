import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import sinon from "sinon";
import Header from "./../Header";

describe("<Header />", () => {
  it("Le componsant doit être rendu", () => {
    shallow(<Header />);
  });

  describe("Suite de tests sur les propTypes", () => {
    beforeEach(() => {
      console.error = sinon.spy();
    });

    afterAll(() => {
      console.error.restore();
    });

    test("should have onClickDetails prop invalidate if not a function", () => {
      const props = ["onClickMenu", "onClickSubmitFeed"];

      const checkInvalidateProps = prop => {
        console.error = sinon.spy();
        shallow(<Header {...{ [prop]: false }} />);
        shallow(<Header {...{ [prop]: 0 }} />);
        shallow(<Header {...{ [prop]: "0" }} />);
        shallow(<Header {...{ [prop]: [] }} />);
        shallow(<Header {...{ [prop]: () => false }} />);

        expect(console.error.callCount).to.equal(
          4,
          `${prop} doit etre dans les PropTypes`
        );
      };

      props.map(checkInvalidateProps);
    });
  });

  describe("Suite de tests sur le pure rendering", () => {
    it("Le composant doit être un pure composant", () => {
      const onClickMenu = () => false;
      let wrapper = shallow(<Header onClickMenu={onClickMenu} />);

      let spy = sinon.spy(wrapper.instance(), "render");

      wrapper.update();
      expect(spy.callCount).to.eq(
        0,
        "L'update ne doit pas faire un nouveau render"
      );

      wrapper.setProps({ onClickMenu });
      expect(spy.callCount).to.eq(
        0,
        "Mettre à jour une props sans changer la valeur ne doit pas faire de nouveau rendu"
      );
    });
  });
  describe("Suite test for private methods", () => {
    test("should handle onClose and onChangeTab", () => {
      const onClickMenu = sinon.spy();
      const onClickSubmitFeed = sinon.spy();

      const wrapper = shallow(
        <Header
          onClickMenu={onClickMenu}
          onClickSubmitFeed={onClickSubmitFeed}
        />
      );

      wrapper.find(".menu").simulate("click");
      wrapper.find(".add").simulate("click");

      expect(onClickMenu.calledOnce).to.equal(true);
      expect(onClickSubmitFeed.calledOnce).to.equal(true);
    });
  });
});
