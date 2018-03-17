import Api from "./../utils/api";
import * as types from "../constants/articles";

/**
 * Permet de stocker un article
 * @param {string} url - L'url de l'article
 */
export const storeArticle = url => ({
  type: types.storeArticle,
  url
});

/**
 * Permet de mettre à jour un article
 * @param {string} url - L'url de l'article
 * @param {object} info - Les informations à modifier
 */
export const updateArticle = (url, info) => ({
  type: types.updateArticle,
  url,
  ...info
});

/**
 * Permet de sélectionner un article
 * @param {string} url - L'url de l'article
 */
export const selectArticle = url => ({
  type: types.selectArticle,
  url
});

/**
 * Permet de déselectionner un article
 */
export const unselectArticle = () => ({
  type: types.unselectArticle
});

/**
 * Permet de dire qu'un article charge
 * @param {string} url - L'url de la source
 */
export const fetching = url => ({
  type: types.fetching,
  url
});

/**
 * Permet de dire qu'un article ne charge plus
 * @param {string} url - L'url de la source
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
  dispatcher(storeArticle(url));
  dispatcher(fetching(url));

  return Api.getArticle(url).then(({ title, text }) => {
    dispatcher(updateArticle(url, { title, text }));
    return dispatcher(fetchEnd(url));
  });
};
