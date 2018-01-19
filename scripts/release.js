const { exec } = require("child_process");

const executeSemanticRelease = () =>
  new Promise((resolve, reject) => {
    const { version: oldVersion } = require(`${process.cwd()}/package.json`);

    console.log("Semantical release est lancé");
    console.log(`La version actuelle est ${oldVersion}`);

    exec("yarn do:release", error => {
      if (error) return reject(error);
      const { version: newVersion } = require(`${process.cwd()}/package.json`);

      console.log(`La nouvelle version est ${newVersion}`);
      console.log("Semantical release checking des versions");

      const isSameVersion = oldVersion === newVersion;

      console.log(
        isSameVersion
          ? "Aucune nouvelles versions"
          : "Une nouvelle version a été détectée"
      );

      return resolve(isSameVersion);
    });
  });

const executeBuildAndDeploy = isSameVersion =>
  new Promise((resolve, reject) => {
    if (isSameVersion) {
      console.log("Les versions sont les mêmes, pas de déploiement");
      return resolve();
    }
    console.log("Début de la compilation et du déploiement");

    exec("yarn build && yarn deploy:ci", error => {
      if (error) return reject(error);
      resolve();
    });
  });

executeSemanticRelease()
  .then(executeBuildAndDeploy)
  .then(() => {
    console.log("Script terminé avec success");
    process.exit(0);
  })
  .catch(error => {
    console.log(error);
    process.exit(1);
  });
