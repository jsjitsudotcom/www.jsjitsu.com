const fs = require("fs");
const cheerio = require("cheerio");
const HTML_PATH = "build/index.html";

const getHtml = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (error, html) => {
      if (error) return reject(error);
      return resolve(html.toString());
    });
  });

getHtml(HTML_PATH).then(html => {
  const $ = cheerio.load(html);
  const linkSelector = $("[rel=stylesheet]");
  const getFilename = linkSelector.attr("href");
  linkSelector.replaceWith(
    `<link rel="preload" href="${getFilename}" as="style" onload="this.rel='stylesheet'">`
  );
  fs.writeFileSync("build/index.html", $.html());
  process.exit();
});
