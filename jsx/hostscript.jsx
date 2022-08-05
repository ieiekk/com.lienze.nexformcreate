/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

//@include '../js/libs/json2.js';

function alertTest() {
  alert('test');
}

function saveJob(job) {
  var os = $.os.split('/')[0];

  var jobFile;
  if (os == 'Windows') {
    jobFile = new File('C:/Users/Public/Documents/exampleJob.json');
  } else {
    jobFile = new File('/Users/Shared/exampleJob.json');
  }
  jobFile.encoding = 'UTF8';
  jobFile.open('w');
  jobFile.write(JSON.stringify(job));
  jobFile.close();
  return jobFile;
}

function updateAESource() {
  var data = {};
  if (app.project.activeItem instanceof CompItem) {
    data.comp = app.project.activeItem.name;
  }
  if (app.project.activeItem.selectedLayers.length > 0) {
    data.layer = app.project.activeItem.selectedLayers[0].name;
  }
  if (app.project.activeItem.selectedProperties.length > 0) {
    var sp = app.project.activeItem.selectedProperties[0];
    data.prop = sp.name;
    data.value = sp.value;
  }

  // alert(JSON.stringify(data));
  return JSON.stringify(data);
}
