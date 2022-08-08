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

function getProjectFilepath() {
  if (app.project == undefined || app.project == null) {
    return;
  }
  var os = $.os.split('/')[0];
  var filePath = app.project.file.fsName.replace(/\\/gi, '/');

  if (os.indexOf('Win') == -1) {
    filePath = filePath.substr(1);
  }

  return filePath;
}

function getFps() {
  if (getCompItemByName('Main') == null) {
    return;
  }

  return round2Two(getCompItemByName('Main').frameRate);
}

function getCompItemByName(n) {
  for (var i = 1; i <= app.project.numItems; i++) {
    var item = app.project.item(i);
    if (item instanceof CompItem && item.name == n) {
      return item;
    }
  }
  return null;
}

function round2Two(f) {
  f *= 100;
  f = Math.floor(f);
  f /= 100;
  return f;
}
