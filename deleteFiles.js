const { rmdir, unlink } = require('fs').promises;


const starterFiles = [];
(function deleteFiles() {
  starterFiles.push(
    unlink('build.js').catch(err => console.log(err)),
    unlink('deleteFiles.js').catch(err => console.log(err)),
    unlink('.vscode/tasks.json').catch(err => console.log(err)),
    rmdir('.vscode').catch(err => console.log(err))
  );

  deleteFilesComplete();
})();

function deleteFilesComplete() {
  Promise.all(starterFiles)
    .then(() => console.log('Starter files deleted! 👍'))
    .catch(err => console.log(err));
}