import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import sinon from "sinon";
import SubHeader from "./../SubHeader";

describe("<SubHeader />", () => {
  it("Le componsant doit être rendu", () => {
    shallow(<SubHeader />);
  });

  describe("Suite de tests sur les propTypes", () => {
    beforeEach(() => {
      console.error = sinon.spy();
    });

    afterAll(() => {
      console.error.restore();
    });

    test("Vérification que toutes les props soient bien dans les propTypes", () => {
      const props = ["tabs", "selected", "onSelect"];
      const propTypes = Object.keys(SubHeader.propTypes);

      expect(props).to.deep.eq(propTypes);
    });
  });

  describe("Suite de tests de l'affichage", () => {
    test("Doit bien afficher tous les onglets", () => {
      const tabs = ["echojs", "medium"];
      const wrapper = shallow(<SubHeader tabs={tabs} />);

      const tabsElements = wrapper.find(".tab");
      expect(tabsElements.length).to.eq(2);

      tabsElements.forEach((element, index) => {
        expect(element.text()).to.eq(tabs[index]);
      });
    });

    test("Doit mettre en mode actif l'onglet sélectionné", () => {
      const tabs = ["echojs", "medium"];
      const wrapper = shallow(<SubHeader tabs={tabs} selected="echojs" />);

      expect(wrapper.find(".tabActive").text()).to.eq("echojs");
    });
  });

  describe("Suite de tests sur le pure rendering", () => {
    it("Le composant doit être un pure composant", () => {
      const tabs = [];
      let wrapper = shallow(<SubHeader tabs={tabs} />);

      let spy = sinon.spy(wrapper.instance(), "render");

      wrapper.update();
      expect(spy.callCount).to.eq(
        0,
        "L'update ne doit pas faire un nouveau render"
      );

      wrapper.setProps({ tabs });
      expect(spy.callCount).to.eq(
        0,
        "Mettre à jour une props sans changer la valeur ne doit pas faire de nouveau rendu"
      );
    });
  });

  describe("Suite test des methodes", () => {
    test("La methode onSelect doit être appelée lors du clique sur l'onglet", () => {
      const tabs = ["echojs", "medium"];
      const onSelect = sinon.spy();
      const wrapper = shallow(<SubHeader tabs={tabs} onSelect={onSelect} />);

      const links = wrapper.find(".tab");

      links.forEach(element => {
        element.simulate("click", { target: {} });
      });

      expect(onSelect.callCount).to.equal(links.length);
    });
  });
});
