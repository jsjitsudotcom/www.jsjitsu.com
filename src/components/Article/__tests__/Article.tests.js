import React from "react";
import { mount } from "enzyme";
import { expect } from "chai";
import sinon from "sinon";
import Article from "./../Article";

describe("<Article />", () => {
  it("Le componsant doit être rendu", () => {
    mount(<Article />);
  });

  describe("Suite de tests sur les propTypes", () => {
    test("Vérification que toutes les props soient bien dans les propTypes", () => {
      const props = ["text", "title"];
      const propTypes = Object.keys(Article.propTypes);

      expect(props).to.deep.eq(propTypes);
    });
  });

  describe("Suite de tests de l'affichage", () => {
    test("Le titre doit bien s'afficher", () => {
      const title = "Je suis un titre";
      const wrapper = mount(<Article title={title} />);

      expect(wrapper.find(".headerTopTitle").text()).to.eq(title);
      expect(wrapper.find(".title").text()).to.eq(title);
    });

    test("Le texte doit bien s'afficher en html", () => {
      const text = "<span>Je suis un texte</span>";
      const wrapper = mount(<Article text={text} />);

      expect(wrapper.find(".body").html()).to.eq(
        `<div class="body">${text}</div>`
      );
    });
  });

  describe("Suite de tests sur le pure rendering", () => {
    it("Le composant doit être un pure composant", () => {
      let wrapper = mount(<Article title="title" text="link" />);

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
    describe("Suite de tests de la méthode onScroll", () => {
      test("Doit afficher/cacher le header et son titre", () => {
        const wrapper = mount(<Article />);

        const instance = wrapper.instance();

        instance.onScroll({ target: { scrollTop: 320 } });

        const hasClass = () =>
          wrapper
            .update()
            .find(".headerTop")
            .hasClass("headerTopShowBackground");

        expect(hasClass()).to.eq(true);

        instance.onScroll({ target: { scrollTop: 200 } });

        expect(hasClass()).to.eq(false);
      });

      test("Doit afficher/cacher le titre principal", () => {
        const wrapper = mount(<Article />);

        const instance = wrapper.instance();

        instance.onScroll({ target: { scrollTop: 400 } });

        const hasClass = () =>
          wrapper
            .update()
            .find(".title")
            .hasClass("hide");

        expect(hasClass()).to.eq(true);

        instance.onScroll({ target: { scrollTop: 200 } });

        expect(hasClass()).to.eq(false);
      });
    });

    describe("Suite de test des methodes pour changer les etats d'animation", () => {
      it("showHeader ne doit pas rappeler setState si l'élement est déjà visible", () => {
        const wrapper = mount(<Article />);

        const instance = wrapper.instance();

        const spy = sinon.spy(instance, "setState");

        instance.showHeader();
        instance.showHeader();

        expect(spy.calledOnce).to.eq(true);
      });

      it("hideHeader ne doit pas rappeler setState si l'élement est déjà caché", () => {
        const wrapper = mount(<Article />);

        const instance = wrapper.instance();

        const spy = sinon.spy(instance, "setState");

        instance.showHeader();
        instance.hideHeader();
        instance.hideHeader();

        expect(spy.calledTwice).to.eq(true);
      });

      it("showTitleHeader ne doit pas rappeler setState si l'élement est déjà caché", () => {
        const wrapper = mount(<Article />);

        const instance = wrapper.instance();

        const spy = sinon.spy(instance, "setState");

        instance.showTitleHeader();
        instance.showTitleHeader();

        expect(spy.calledOnce).to.eq(true);
      });

      it("hideTitleHeader ne doit pas rappeler setState si l'élement est déjà caché", () => {
        const wrapper = mount(<Article />);

        const instance = wrapper.instance();

        const spy = sinon.spy(instance, "setState");

        instance.showTitleHeader();
        instance.hideTitleHeader();
        instance.hideTitleHeader();

        expect(spy.calledTwice).to.eq(true);
      });
    });
  });
});
