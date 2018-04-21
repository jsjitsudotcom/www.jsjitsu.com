jest.mock("./../../../utils/api", () => require("./__mocks__/Home.api"));

import React from "react";
import { expect } from "chai";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import createStore from "./../../../stores";
import actions from "./../../../actions";
import fetchMock from "fetch-mock";
import * as constants from "./../../../constants/feeds";
import { mapObjIndexed } from "ramda";
import sinon from "sinon";

import mockFeeds from "./__data__/feed.json";

import Connected, { Component as Home } from "./../Home";
import Feed from "./../../../components/Feed/Feed";
import SubHeader from "./../../../components/SubHeader/SubHeader";
import ModalSubmitFeed from "./../../../components/ModalSubmitFeed/ModalSubmitFeed";

describe.skip("<Home />", () => {
  console.warn = () => false;

  test("Le componsant doit être rendu", () => {
    shallow(<Home />);
  });

  describe("Suite test props validation", () => {
    test("Les propTypes doivent bien comporter toutes les props", () => {
      const props = [
        "fetchSource",
        "selected",
        "loading",
        "sourceArray",
        "selectSource"
      ];

      const propTypes = Object.keys(Home.propTypes);

      props.map(prop => {
        return expect(propTypes.includes(prop)).to.eq(
          true,
          `${prop} doit être dans les propTypes`
        );
      });
    });
  });

  describe("Suite de test l'affichage", () => {
    test("Le Menu doit être présent", () => {
      const wrapper = shallow(<Home />);

      expect(wrapper.find("Menu").exists()).to.eq(true);
    });

    test("Le ModalSubmitFeed doit être présent", () => {
      const wrapper = shallow(<Home />);

      expect(wrapper.find("ModalSubmitFeed").exists()).to.eq(true);
    });

    // test("Le Header doit être présent", () => {
    //   const wrapper = shallow(<Home />);

    //   expect(wrapper.find("Header").exists()).to.eq(true);
    // });

    // test("Le SubHeader doit être présent", () => {
    //   const wrapper = shallow(<Home />);

    //   expect(wrapper.find("SubHeader").exists()).to.eq(true);
    // });

    test("Le Feed doit être présent lorsqu'il y a des feeds", () => {
      const wrapper = shallow(<Home feeds={[{}]} />);

      expect(wrapper.find("Feed").exists()).to.eq(true);
    });

    test("Le Feed ne doit pas être présent lorsqu'il n'y a pas de feed", () => {
      const wrapper = shallow(<Home feeds={[]} />);

      expect(wrapper.find("Feed").exists()).to.eq(false);
    });

    test("Des feeds en mode loading doivent être présent lorsqu'on charge des contenus", () => {
      const wrapper = shallow(<Home feeds={[]} loading={true} />);

      expect(wrapper.find("Feed").exists()).to.eq(true);
    });
  });

  describe("Suite de tests des props des enfants", () => {
    test.skip("Le Header doit bien s'afficher avec les bonnes props", () => {
      const wrapper = shallow(<Home />);

      expect(wrapper.find("Header").exists()).to.eq(true);

      const propsSendedToHeader = wrapper.find("Header").props();
      const headerPropTypes = Header.propTypes;

      mapObjIndexed((value, key) => {
        expect(headerPropTypes.hasOwnProperty(key)).to.eq(
          true,
          `${key} ne se trouve pas dans les propTypes`
        );
      }, propsSendedToHeader);
    });

    test("Le ModalSubmitFeed doit bien s'afficher avec les bonnes props", () => {
      const wrapper = shallow(<Home />);

      expect(wrapper.find("ModalSubmitFeed").exists()).to.eq(true);

      const propsSendedToModalSubmitFeed = wrapper
        .find("ModalSubmitFeed")
        .props();
      const ModalSubmitFeedPropTypes = ModalSubmitFeed.propTypes;

      mapObjIndexed((value, key) => {
        expect(ModalSubmitFeedPropTypes.hasOwnProperty(key)).to.eq(
          true,
          `${key} ne se trouve pas dans les propTypes`
        );
      }, propsSendedToModalSubmitFeed);
    });

    test("Le Feed doit bien s'afficher avec les bonnes props", () => {
      const wrapper = shallow(<Home feeds={[{}]} />);

      expect(wrapper.find("Feed").exists()).to.eq(true);

      const propsSendedToFeed = wrapper.find("Feed").props();
      const FeedPropTypes = Feed.propTypes;

      mapObjIndexed((value, key) => {
        expect(FeedPropTypes.hasOwnProperty(key)).to.eq(
          true,
          `${key} ne se trouve pas dans les propTypes`
        );
      }, propsSendedToFeed);
    });
  });

  describe("Suite de test les interactions", () => {
    describe("Tests de suite de modalSubmitFeed", () => {
      test("Doit ouvrir le modalSubmitFeed lorsque Header.onClickSubmitFeed() est appelée", () => {
        const wrapper = shallow(<Home />);

        wrapper.find("Header").prop("onClickSubmitFeed")();

        expect(wrapper.state().modalSubmitFeed).to.eq(true);
      });

      test("Doit fermer le modalSubmitFeed lorsque sa props onClose est appelée", () => {
        const wrapper = shallow(<Home />);

        wrapper.instance().openSubmitFeed();

        wrapper.find("ModalSubmitFeed").prop("onClose")();

        expect(wrapper.state().modalSubmitFeed).to.eq(false);
      });
    });

    describe("Tests de suite du Menu", () => {
      test("Doit ouvrir le Menu lorsque Header.onClickMenu() est appelée", () => {
        const wrapper = shallow(<Home />);

        wrapper.find("Header").prop("onClickMenu")();

        expect(wrapper.state().menu).to.eq(true);
      });

      test("Doit fermer le Menu lorsque sa props onClose est appelée", () => {
        const wrapper = shallow(<Home />);

        wrapper.instance().openMenu();

        wrapper.find("Menu").prop("onClose")();

        expect(wrapper.state().modalSubmitFeed).to.eq(false);
      });
    });
  });

  describe("Tests avec le container de redux", () => {
    const initialState = {
      feeds: {
        selected: "Echojs",
        sources: {
          Echojs: {
            name: "Echojs",
            feeds: []
          },
          Medium: {
            name: "Medium",
            feeds: []
          }
        }
      }
    };

    beforeEach(async () => {
      // fetchMock.get(/feeds/, mockFeeds);
      // fetchMock.get(/articles/, { url: "nope", title: "Hello", content: "Hi !" });
    });

    afterEach(() => {
      // fetchMock.restore();
    });

    test("Le composant Home doit être rendu avec les bonnes props issues du container", () => {
      const store = createStore(initialState);

      const wrapper = mount(
        <Provider store={store}>
          <Connected />
        </Provider>
      );

      expect(wrapper.find("Home").exists()).to.eq(true);
      expect(wrapper.find("Home").prop("loading")).to.eq(true);
    });

    test("Le composant SubHeader doit bien recevoir les props du container", () => {
      const store = createStore(initialState);

      const wrapper = mount(
        <Provider store={store}>
          <Connected />
        </Provider>
      );

      const SubHeaderProps = wrapper.find("SubHeader").props();

      expect(SubHeaderProps.selected).to.eq(initialState.feeds.selected);
      expect(SubHeaderProps.tabs).to.deep.eq(["Echojs", "Medium"]);
    });

    test("La source doit bien être modifiée lorsque la prop SubHeader.onSelect() est appelée", async () => {
      const store = createStore(initialState);
      const source = "Medium";

      const wrapper = mount(
        <Provider store={store}>
          <Connected />
        </Provider>
      );

      expect(wrapper.find("Home").prop("loading")).to.eq(true);
      wrapper.find("SubHeader").prop("onSelect")(source);

      setTimeout(() => {
        expect(wrapper.find("SubHeader").prop("selected")).to.eq(source);
        expect(wrapper.find("Home").prop("loading")).to.eq(false);
      }, 1);
    });
  });
});
