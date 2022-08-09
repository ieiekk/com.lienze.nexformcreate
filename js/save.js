// const fs = require('fs');
// const os = require('os');

// let job = questsToJob(this.data.quests);
// let jobContent = new Blob([JSON.stringify(job), { type: 'application/json' }]);

document.getElementById('btn-TEST').addEventListener('click', () => {
  axios
    .post('https://jsonplaceholder.typicode.com/posts', {
      data: {
        id: 123,
        name: 'Kevin',
      },
      headers: 'application/json',
    })
    .then((res) => {
      alert(JSON.stringify(res.data));
    })
    .catch((err) => {
      alert(err);
    });
});

// function saveFile() {

// }
