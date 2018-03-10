import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import sinon from "sinon";
import Feed from "./../Feed";

describe("<Feed />", () => {
  it("Le componsant doit être rendu", () => {
    shallow(<Feed />);
  });

  describe("Suite de tests sur les propTypes", () => {
    beforeEach(() => {
      console.error = sinon.spy();
    });

    afterAll(() => {
      console.error.restore();
    });

    test("should have onClickDetails prop invalidate if not a function", () => {
      const props = ["title", "link", "loading", "loadingDelay"];

      const checkInvalidateProps = prop => {
        console.error = sinon.spy();
        shallow(<Feed {...{ [prop]: false }} />);
        shallow(<Feed {...{ [prop]: 0 }} />);
        shallow(<Feed {...{ [prop]: "0" }} />);
        shallow(<Feed {...{ [prop]: [] }} />);
        shallow(<Feed {...{ [prop]: () => false }} />);

        expect(console.error.callCount).to.equal(
          4,
          `${prop} doit etre dans les PropTypes`
        );
      };

      props.map(checkInvalidateProps);
    });
  });

  describe("Suite de tests de l'affichage", () => {
    test("Le titre doit bien s'afficher", () => {
      const title = "Je suis un titre";
      const wrapper = shallow(<Feed title={title} />);

      expect(wrapper.find(".title").text()).to.eq(title);
    });
    test("L'index doit bien s'afficher", () => {
      const index = "Je suis un titre";
      const wrapper = shallow(<Feed index={index} />);

      expect(wrapper.find(".index").text()).to.eq(index);
    });
    test("Le lien doit bien s'afficher avec le lien dans son href", () => {
      const link = "Je suis un titre";
      const wrapper = shallow(<Feed link={link} />);

      expect(wrapper.find(".container").prop("href")).to.eq(link);
    });
    test("Le loading doit bien s'afficher lorsque la props est de loading est active", () => {
      const loadingDelay = 200;
      const wrapper = shallow(<Feed loading loadingDelay={loadingDelay} />);

      expect(wrapper.find("Loading").prop("delay")).to.eq(loadingDelay);
    });
  });

  describe("Suite de tests sur le pure rendering", () => {
    it("Le composant doit être un pure composant", () => {
      let wrapper = shallow(
        <Feed
          title="title"
          link="link"
          index="0"
          loading={false}
          loadingDelay={200}
        />
      );

      let spy = sinon.spy(wrapper.instance(), "render");

      wrapper.update();
      expect(spy.callCount).to.eq(
        0,
        "L'update ne doit pas faire un nouveau render"
      );

      wrapper.setProps({ title: "title" });
      expect(spy.callCount).to.eq(
        0,
        "Mettre à jour une props sans changer la valeur ne doit pas faire de nouveau rendu"
      );
    });
  });
});
