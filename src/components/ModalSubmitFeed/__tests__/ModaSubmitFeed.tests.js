import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import sinon from "sinon";
import ModalSubmitFeed from "./../ModalSubmitFeed";

jest.useFakeTimers();

describe("<ModalSubmitFeed />", () => {
  it("Le componsant doit être rendu", () => {
    shallow(<ModalSubmitFeed />);
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
      const propTypes = Object.keys(ModalSubmitFeed.propTypes);

      expect(props).to.deep.eq(propTypes);
    });
  });

  describe("Suite de tests de l'affichage", () => {
    test("Doit ouvrir/fermé le modal", () => {
      const wrapper = shallow(<ModalSubmitFeed open={true} />);

      expect(wrapper.find(".containerOpen").exists()).to.eq(true);

      wrapper.setProps({ open: false });
      expect(wrapper.find(".container").exists()).to.eq(true);
    });

    test("Doit mettre en mode actif l'onglet sélectionné", () => {
      const wrapper = shallow(<ModalSubmitFeed open={true} />);

      expect(wrapper.find(".containerOpen").exists()).to.eq(true);
    });

    test("Doit afficher le formulaire lorsque le step est egal à form et vérifier que la valeur du formulaire correspond bien à la valeur dans la state", () => {
      const wrapper = shallow(<ModalSubmitFeed open={true} />);

      wrapper.setState({ step: "form" });

      expect(wrapper.find("Form").exists()).to.eq(true);
      expect(wrapper.find("Form").prop("value")).to.eq(wrapper.state().value);
    });

    test("Doit afficher le message de success lorsque la state est en mode success", () => {
      const wrapper = shallow(<ModalSubmitFeed open={true} />);

      wrapper.setState({ step: "success" });

      expect(wrapper.find("Success").exists()).to.eq(true);
    });
  });

  describe("Suite de tests sur le pure rendering", () => {
    it("Le composant doit être un pure composant", () => {
      const open = true;
      let wrapper = shallow(<ModalSubmitFeed open={open} />);

      let spy = sinon.spy(wrapper.instance(), "render");

      wrapper.update();
      expect(spy.callCount).to.eq(
        0,
        "L'update ne doit pas faire un nouveau render"
      );

      wrapper.setProps({ open });
      expect(spy.callCount).to.eq(
        0,
        "Mettre à jour une props sans changer la valeur ne doit pas faire de nouveau rendu"
      );
    });
  });

  describe("Suite test des methodes", () => {
    test("La methode onClose doit être appelée lorsqu'on clique sur l'overlay", () => {
      const onClose = sinon.spy();
      const wrapper = shallow(
        <ModalSubmitFeed open={true} onClose={onClose} />
      );

      wrapper.find(".overlay").simulate("click");

      expect(onClose.calledOnce).to.equal(true);
    });

    test("La methode onChange doit bien être appelée dans Form et doit bien ajouter dans la state la valeur", () => {
      const wrapper = shallow(<ModalSubmitFeed open={true} />);
      const value = "hello";
      const spy = sinon.spy(wrapper.instance(), "onChange");
      wrapper.find("Form").prop("onChange")({ target: { value } });

      expect(spy.calledOnce).to.equal(true);
      expect(wrapper.state().value).to.eq(value);
    });

    describe("Suite de tests de la méthode onSubmit", () => {
      test("Ne doit rien faire si la valeur est nulle", () => {
        const wrapper = shallow(<ModalSubmitFeed open={true} />);
        const spy = sinon.spy(wrapper.instance(), "setState");

        expect(wrapper.instance().onSubmit()).to.eq(false);
        expect(spy.called).to.eq(false, "La state ne doit pas avoir changée");
      });

      test("Le composant doit bien afficher success et revenir à form et se fermer une fois le submit fait avec une valeur", () => {
        const onClose = sinon.spy();
        const wrapper = shallow(
          <ModalSubmitFeed open={true} onClose={onClose} />
        );
        const spy = sinon.spy(wrapper.instance(), "setState");

        wrapper.setState({ value: "hello" });

        wrapper.instance().onSubmit();

        expect(spy.calledTwice).to.eq(
          true,
          "La state doit avoir changé deux fois"
        );

        jest.runAllTimers();

        expect(wrapper.state().step).to.eq(
          "form",
          "Au bout de quelques secondes, le step doit etre revenu à form"
        );

        expect(onClose.calledOnce).to.eq(true);
      });
    });
  });
});
