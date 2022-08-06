//@include '../js/libs/json2.js'

function saveJob() {
  var data = JSON.parse('__dataStr__');
  var first = JSON.stringify(data.quests[0][0]);
  alert('__dataStr__');
}

saveJob();
