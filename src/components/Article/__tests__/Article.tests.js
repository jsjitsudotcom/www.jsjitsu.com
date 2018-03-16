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

  // describe("Suite de tests de l'affichage", () => {
  //   test("Le titre doit bien s'afficher", () => {
  //     const title = "Je suis un titre";
  //     const wrapper = shallow(<Article title={title} />);

  //     expect(wrapper.find(".title").text()).to.eq(title);
  //   });
  //   test("L'index doit bien s'afficher", () => {
  //     const index = "Je suis un titre";
  //     const wrapper = shallow(<Article index={index} />);

  //     expect(wrapper.find(".index").text()).to.eq(index);
  //   });
  //   test("Le lien doit bien s'afficher avec le lien dans son href", () => {
  //     const link = "Je suis un titre";
  //     const wrapper = shallow(<Article link={link} />);

  //     expect(wrapper.find(".container").prop("href")).to.eq(link);
  //   });
  //   test("Le loading doit bien s'afficher lorsque la props est de loading est active", () => {
  //     const loadingDelay = 200;
  //     const wrapper = shallow(<Article loading loadingDelay={loadingDelay} />);

  //     expect(wrapper.find("Loading").prop("delay")).to.eq(loadingDelay);
  //   });
  // });

  // describe("Suite de tests sur le pure rendering", () => {
  //   it("Le composant doit être un pure composant", () => {
  //     let wrapper = shallow(
  //       <Article
  //         title="title"
  //         link="link"
  //         index="0"
  //         loading={false}
  //         loadingDelay={200}
  //       />
  //     );

  //     let spy = sinon.spy(wrapper.instance(), "render");

  //     wrapper.update();
  //     expect(spy.callCount).to.eq(
  //       0,
  //       "L'update ne doit pas faire un nouveau render"
  //     );

  //     wrapper.setProps({ title: "title" });
  //     expect(spy.callCount).to.eq(
  //       0,
  //       "Mettre à jour une props sans changer la valeur ne doit pas faire de nouveau rendu"
  //     );
  //   });
  // });
});
