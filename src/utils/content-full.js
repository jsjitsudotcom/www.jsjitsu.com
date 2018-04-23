import * as contentful from "contentful";

const client = contentful.createClient({
  space: "xc43wxyi19mo",
  accessToken:
    "68e61fbd3885082ffae00ea2a2b8b1e6617dc47c1c441413b59c56ba413c99bb"
});

export default client;

const parseSeries = ({ items = [] } = {}) => {
  return items.map(({ sys, fields }) => ({
    id: sys.id,
    ...fields,
    categories: fields.categories,
    illustration: fields.illustration.fields.file.url
  }));
};

const parseEpisode = ({ items = [] } = {}) => {
  return items.map(({ sys, fields }) => ({
    id: sys.id,
    ...fields,
    illustration: fields.illustration.fields.file.url
  }));
};

const parseCategory = ({ items = [] } = {}) => {
  return items.map(({ sys, fields }) => ({
    id: sys.id,
    ...fields
  }));
};

const findAll = ({ content_type, parser }) => ({ where } = {}) =>
  client.getEntries({ content_type, ...where }).then(parser);

export const getEpisodes = findAll({
  content_type: "episode",
  parser: parseEpisode
});
export const getCategories = findAll({
  content_type: "category",
  parser: parseCategory
});
export const getSeries = findAll({
  content_type: "serie",
  parser: parseSeries
});

export const findById = id => client.getEntry(id);
