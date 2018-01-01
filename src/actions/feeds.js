import * as types from "../constants/albums";

/**
 * Permet d'ajouter les albums
 * @param {*} albums - La liste des albums
 */
export const insertAlbums = albums => ({
  type: types.insertAlbums,
  albums
});