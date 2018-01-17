const argv = require("minimist")(process.argv.slice(2));
const { exec } = require("child_process");
const Promise = require("bluebird");
const chalk = require("chalk");
const inquirer = require("inquirer");

if (!argv.stage)
  throw new Error("You have to provide a --stage [ beta | dev | production ]");

const getUrl = stage => {
  if (stage === "production") return `www.jsjitsu.com`;
  throw new Error(
    `The stage "${stage}" is not a valid stage -> [ production ]`
  );
};

const execWithoutCompression = stage => () =>
  new Promise((resolve, reject) => {
    const url = getUrl(stage);
    const command = `aws s3 sync ./build s3://${url} --acl public-read --region=eu-west-1 --exclude '*.js' --exclude '*.html' --exclude '*.css'`;
    return exec(command, (error, stdout, stderr) => {
      if (error) return reject(error);
      return resolve();
    });
  });

const execWithCompression = stage => () =>
  new Promise((resolve, reject) => {
    const url = getUrl(stage);
    const command = `aws s3 sync ./build s3://${url} --acl public-read --region=eu-west-1 --exclude '*' --include '*.js' --include '*.css' --exclude '*-worker.js' --content-encoding=gzip`;
    return exec(command, (error, stdout, stderr) => {
      if (error) return reject(error);
      return resolve();
    });
  });

const execWithCompressionHtml = stage => () =>
  new Promise((resolve, reject) => {
    const url = getUrl(stage);
    const command = `aws s3 sync ./build s3://${url} --acl public-read --region=eu-west-1 --exclude '*' --include '*.html' --content-encoding=gzip --cache-control max-age=0`;
    return exec(command, (error, stdout, stderr) => {
      if (error) return reject(error);
      return resolve();
    });
  });

const execWithCompressionSW = stage => () =>
  new Promise((resolve, reject) => {
    const url = getUrl(stage);
    const command = `aws s3 sync ./build s3://${url} --acl public-read --region=eu-west-1 --exclude '*' --include '*-worker.js' --content-encoding=gzip --cache-control max-age=0`;
    return exec(command, (error, stdout, stderr) => {
      if (error) return reject(error);
      return resolve();
    });
  });

console.log(
  chalk.yellow(
    `
    This module deployment will deploy static contents with gzip content-encoding.
    All files who match with have to be gziped
    > *.css
    > *.js
    > *.html
    `
  )
);

const log = message => () => console.log(chalk.green(message));

const runWithConfirm = () =>
  inquirer
    .prompt({
      type: "confirm",
      name: "confirm",
      message: `Êtes-vous sûr de vouloir déployer l'application en ${
        argv.stage
      } ?`
    })
    .then(response => {
      if (response.confirm) return run(argv.stage);
      log("Déploiement aborté !")();
      return false;
    })
    .then(() => process.exit());

const runWithoutConfirm = () => run(argv.stage).then(() => process.exit());

const run = stage => {
  log(`Deployment started to ${stage}`)();
  return execWithoutCompression(stage)()
    .then(log("Static contents without compression successfully deployed"))
    .then(execWithCompression(stage))
    .then(log("Static contents with compression successfully deployed"))
    .then(execWithCompressionSW(stage))
    .then(log("Static sw with compression successfully deployed"))
    .then(execWithCompressionHtml(stage))
    .then(log("Static html deployed"));
};

// "aws s3 sync ./build s3://beta.dashboard.nunki.co --acl public-read --region=eu-west-1 --exclude '*.js' --exclude '*.html' --exclude '*.css' && aws s3 sync ./build s3://beta.dashboard.nunki.co --acl public-read --region=eu-west-1 --exclude '*' --include '*.js' --include '*.css' --include '*.html' --content-encoding=gzip",

if(process.env.CI) return runWithoutConfirm();
return runWithConfirm();