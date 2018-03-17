import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import sinon from "sinon";
import Feed from "./../Feed";

describe("<Feed />", () => {
  console.warn = () => false;

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

    test("Vérification que toutes les props soient bien dans les propTypes", () => {
      const props = [
        "title",
        "index",
        "link",
        "loading",
        "loadingDelay",
        "onMount",
        "onClick"
      ];
      const propTypes = Object.keys(Feed.propTypes);

      expect(props).to.deep.eq(propTypes);
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

  describe("Suite test des methodes", () => {
    test("La propriété onClose doit être appelée lorsqu'on clique sur l'overlay", () => {
      const onClick = sinon.spy();

      const wrapper = shallow(<Feed onClick={onClick} />);

      wrapper.find(".container").simulate("click");

      expect(onClick.calledOnce).to.equal(true);
    });
  });
});
