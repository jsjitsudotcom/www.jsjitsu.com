import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import sinon from "sinon";
import Menu from "./../Menu";

describe("<Menu />", () => {
  it("Le componsant doit être rendu", () => {
    shallow(<Menu />);
  });

  describe("Suite de tests sur les propTypes", () => {
    beforeEach(() => {
      console.error = sinon.spy();
    });

    afterAll(() => {
      console.error.restore();
    });

    test("Vérification que toutes les props soient bien dans les propTypes", () => {
      const props = ["open", "onClose"];
      const propTypes = Object.keys(Menu.propTypes);

      expect(props).to.deep.eq(propTypes);
    });
  });

  describe("Suite de tests de l'affichage", () => {
    test("Le menu doit etre ouvert si la props open est bien activée", () => {
      const wrapper = shallow(<Menu open={true} />);

      expect(wrapper.find(".containerOpen").exists()).to.eq(true);
    });

    test("Le menu doit etre ouvert si la props open est bien désactivée", () => {
      const wrapper = shallow(<Menu open={false} />);

      expect(wrapper.find(".container").exists()).to.eq(true);
    });
  });

  describe("Suite de tests sur le pure rendering", () => {
    it("Le composant doit être un pure composant", () => {
      const onClickMenu = () => false;
      let wrapper = shallow(<Menu onClickMenu={onClickMenu} />);

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

  describe("Suite test des methodes", () => {
    test("La propriété onClose doit être appelée lorsqu'on clique sur l'overlay", () => {
      const onClose = sinon.spy();

      const wrapper = shallow(<Menu open={true} onClose={onClose} />);

      wrapper.find(".overlay").simulate("click");

      expect(onClose.calledOnce).to.equal(true);
    });

    test("Tous les liens doivent appeler la methode privée onClick", () => {
      const wrapper = shallow(<Menu open={true} />);

      const spy = sinon.stub(wrapper.instance(), "onClick");
      const links = wrapper.find(".tab");

      links.forEach(element => {
        element.simulate("click", { target: {} });
      });

      expect(spy.callCount).to.equal(links.length);
    });
  });
});
