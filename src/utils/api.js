import config from "./../config";

export default {
  /**
   * Permet de faire une requete vers l'API
   * @param {*} path - Le chemin d'appel
   */
  fetch(path) {
    return fetch(`${config.RSS_ENDPOINT}/${path}`).then(response => {
      if (response.ok) return response.json();
      return response.json().then(e => Promise.reject(e));
    });
  },
  /**
   * Permet de récupérer les derniers articles d'une source
   * @param {*} source - Le nom de la source
   */
  getFeeds(source) {
    return this.fetch(`feeds/${source}`);
  },
  /**
   * Permet de récupérer un article
   * @param {*} url - L'url de l'article
   */
  getArticle(url) {
    return this.fetch(`articles/?url=${url}`);
  }
};
