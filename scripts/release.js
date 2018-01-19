const { exec } = require('child_process');
const {version: oldVersion} = require('./../package.json');

const executeSemanticRelease = () => {
  
};

const executeBuildAndDeploy = () => {

};

exec('cat package.json', (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  const {version: newVersion} = require('./../package.json');

  if()
});