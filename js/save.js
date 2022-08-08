const fs = require('fs');
// const os = require('os');

// let job = questsToJob(this.data.quests);
// let jobContent = new Blob([JSON.stringify(job), { type: 'application/json' }]);

document.getElementById('btn-TEST').addEventListener('click', () => {
  fs.readFileSync(
    '/Users/lienze/Library/Application Support/Adobe/CEP/extensions/com.lienze.nexformcreate/test.txt',
    function (err, data) {
      if (err) throw err;

      console.log(data.toString());
    }
  );
});

// function saveFile() {

// }
