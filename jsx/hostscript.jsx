/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

//@include '../js/libs/json2.js';

function test() {
  var comp = app.project.activeItem;
  var layer = comp.selectedLayers[0];
  var prop = layer.selectedProperties.pop();

  alert(comp.name);
  alert(layer.name);
  alert(prop.name);
  alert(prop.value);
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
  var comp, layer, prop;
  if (app.project.activeItem instanceof CompItem) {
    comp = app.project.activeItem;
    data.comp = comp.name;
  }
  if (app.project.activeItem.selectedLayers.length > 0) {
    layer = comp.selectedLayers[0];
    data.layer = layer.name;
  }
  if (app.project.activeItem.selectedProperties.length > 0) {
    // var selProps = app.project.activeItem.selectedProperties;
    var prop = layer.selectedProperties.pop();
    var propNameList = [];

    propNameList.push(prop.name);

    for (var i = 1; i < prop.propertyDepth; i++) {
      var current = prop.propertyGroup(i);
      // Avoid including non-Effect group name
      if (current.name != 'Transform' && current.name != 'Text') {
        propNameList.unshift(current.name);
      }
    }

    data.prop = propNameList.join('.'); // ex. Effect.Fill.Color
    data.type = 'data';

    // Source Text handling
    if (prop.propertyValueType == PropertyValueType.TEXT_DOCUMENT) {
      data.value = String(prop.value);
    } else {
      data.value = prop.value;
    }
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
