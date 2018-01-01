import * as types from "../constants/feeds";

/**
 * Permet de créer une nouvelle source
 * @param {string} name - Le nom de la source
 * @param {object} options - Les paramètres initiaux de la source
 */
export const addSource = (name, url, options) => ({
  type: types.addSource,
  name,
  url,
  options
});

/**
 * Permet d'ajouter des feeds à une source
 * @param {string} name - Le nom de la source
 * @param {object} feeds - La liste des feeds
 */
export const addFeeds = (name, feeds) => ({
  type: types.addFeeds,
  name,
  feeds
});

/**
 * Permet d'ajouter des feeds à une source
 * @param {string} name - Le nom de la source
 * @param {object} feeds - La liste des feeds
 */
export const selectSource = (name) => ({
  type: types.selectSource,
  name
});