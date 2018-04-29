import * as Contentfull from "./../utils/content-full";
import * as types from "../constants/series";

/**
 * Permet de stocker les séries
 * @param {Array<Serie>} series - Les séries
 */
export const storeSeries = series => ({
  type: types.storeSeries,
  series
});

/**
 * Permet de stocker les épisodes
 * @param {Array<Episode>} episodes - Les épisodes
 */
export const storeEpisodes = episodes => ({
  type: types.storeEpisodes,
  episodes
});

/**
 * Permet de dire qu'un article charge
 */
export const fetching = () => ({
  type: types.fetching
});

/**
 * Permet de dire qu'un article ne charge plus
 */
export const fetchEnd = () => ({
  type: types.fetchEnd
});

/**
 * Permet d'ajouter des feeds à une source
 * @param {string} name - Le nom de la source
 * @param {object} feeds - La liste des feeds
 */
export const fetchSeries = () => (dispatcher, getState) => {
  dispatcher(fetching());

  return Contentfull.getSeries().then(series => {
    dispatcher(storeSeries(series));
    return dispatcher(fetchEnd());
  });
};

/**
 * Permet d'aller chercher les épisodes d'une série
 * @param {string} id - L'id de la série des épisodes
 */
export const fetchEpisodes = id => (dispatcher, getState) => {
  dispatcher(fetching());

  return Contentfull.getEpisodes({ where: { serie: id } }).then(series => {
    dispatcher(storeEpisodes(series));
    return dispatcher(fetchEnd());
  });
};
