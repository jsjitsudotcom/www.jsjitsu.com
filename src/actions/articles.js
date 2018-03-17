import Api from "./../utils/api";
import * as types from "../constants/articles";

/**
 * Permet de créer une nouvelle source
 * @param {string} name - Le nom de la source
 * @param {object} options - Les paramètres initiaux de la source
 */
export const storeArticle = ({ url, title, text }) => ({
  type: types.storeArticle,
  url,
  title,
  text
});

/**
 * Permet de créer une nouvelle source
 * @param {string} name - Le nom de la source
 * @param {object} options - Les paramètres initiaux de la source
 */
export const fetching = url => ({
  type: types.fetching,
  url
});

/**
 * Permet de créer une nouvelle source
 * @param {string} name - Le nom de la source
 * @param {object} options - Les paramètres initiaux de la source
 */
export const fetchEnd = url => ({
  type: types.fetchEnd,
  url
});

/**
 * Permet d'ajouter des feeds à une source
 * @param {string} name - Le nom de la source
 * @param {object} feeds - La liste des feeds
 */
export const fetchAndStoreArticle = url => (dispatcher, getState) => {
  dispatcher(fetching(url));

  return Api.getArticle(url).then(({ title, text }) => {
    dispatcher(storeArticle({ url, title, text }));
    return dispatcher(fetchEnd(url));
  });
};
