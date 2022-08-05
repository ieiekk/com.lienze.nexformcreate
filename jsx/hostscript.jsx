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
  var comp, layer, prop, value;
  if (app.project.activeItem instanceof CompItem) {
    comp = app.project.activeItem;
    data.comp = comp.name;
  }
  if (app.project.activeItem.selectedLayers.length > 0) {
    layer = app.project.activeItem.selectedLayers[0];
    data.layer = layer.name;
  }
  if (app.project.activeItem.selectedProperties.length > 0) {
    prop = app.project.activeItem.selectedProperties[0];
    // If not PropertyType.PROPERTY then return
    data.prop = prop.name;
    data.type = 'data';
    data.value = prop.font;
  } else if (layer != undefined) {
    if (layer.source instanceof FootageItem) {
      data.value = layer.source.file.fsName.replace(/\\/gi, '/');
      data.prop = 'Footage';
      // Distinguish image, video, audio file
      if (!layer.source.hasAudio) {
        data.type = 'image';
      } else if (!layer.source.hasVideo) {
        data.type = 'audio';
      } else {
        data.type = 'video';
      }
    }
  }
  return JSON.stringify(data);
}

alert(updateAESource());
