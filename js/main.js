/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

const os = require('os');
const fs = require('fs');

var csInterface = new CSInterface();

let AESource = {
  type: 'Type',
  comp: 'Comp',
  layer: 'Layer',
  prop: 'Prop',
  value: 'Value',
};

let projectFilepath = '';
let projectFolderpath = '';
let fps = 29.97;

const modalBody = document.getElementById('modal-body');

document.addEventListener('alpine:init', () => {
  Alpine.data('Quests', function () {
    return {
      data: this.$persist({
        formTitle: 'Test Title',
        formDescription: 'Test Description',
        quests: [[]],
      }),

      currentPage: this.$persist(1),

      addQuest() {
        const activeQuest = {
          uuid: uuid(),
          form: {
            title: `${AESource.comp}-${AESource.layer}-${AESource.prop}`,
            description: 'Description',
            type: 'singleLineText',
            options: ['選項一', '選項二', '選項三'],
          },
          AE: {
            type: AESource.type,
            comp: AESource.comp,
            layer: AESource.layer,
            prop: AESource.prop,
            value: AESource.value,
          },
        };

        if (this.data.quests.length === 0) {
          this.data.quests.push([activeQuest]);
        } else {
          this.data.quests[this.currentPage - 1].push(activeQuest);
        }
      },

      addPage() {
        this.data.quests.splice(this.currentPage, 0, []);
        this.currentPage = this.currentPage + 1;
      },

      removePage() {
        if (this.currentPage <= 1) return;
        this.data.quests.splice(this.currentPage - 1, 1);
        if (this.currentPage > this.data.quests.length) {
          this.currentPage = this.data.quests.length;
        }
      },

      submit() {
        modalBody.innerText = 'Submitting...';
        let job = questsToJob(this.data.quests);
        let jobContent = JSON.stringify(job);

        let jobPath = os.platform().includes('darwin')
          ? `/${projectFolderpath}/exampleJob.json`
          : `${projectFolderpath}/exampleJob.json`;

        // Create exampleJob.json
        fs.writeFileSync(jobPath, jobContent, function (err) {
          if (err) console.log(err);
        });

        let formData = createFormData(this.data);
        let formDataPath = os.platform().includes('darwin')
          ? `/${projectFolderpath}/formData.json`
          : `${projectFolderpath}/formData.json`;

        // Create formData.json
        fs.writeFileSync(
          formDataPath,
          JSON.stringify(formData),
          function (err) {
            if (err) console.log(err);
          }
        );

        modalBody.innerText = 'Done.';
        document.getElementById('submit-OK-button').disabled = true;
      },

      clear() {
        this.currentPage = 1;
        this.data.formTitle = '';
        this.data.formDescription = '';
        this.data.quests = [[]];
      },
    };
  });
});

// addEventListener('mousemove', () => {});
document.getElementById('btn-test').addEventListener('click', updateAESource);
document
  .getElementById('btn-add')
  .addEventListener('mouseenter', updateAESource);
document.getElementById('btn-submit').addEventListener('click', () => {
  document.getElementById('submit-OK-button').disabled = false;
  modalBody.innerText = 'Are you sure to submit this form?';
  updateProjectFilepath();
  updateFps();
});

// Utils

function updateAESource() {
  csInterface.evalScript('updateAESource()', (res) => {
    AESource = JSON.parse(res);
  });
}

function updateProjectFilepath() {
  csInterface.evalScript('getProjectFilepath()', (res) => {
    projectFilepath = res;
    projectFolderpath = projectFilepath.split('/').slice(0, -1).join('/');
  });
}

function updateFps() {
  csInterface.evalScript('getFps()', (res) => {
    fps = res;
  });
}

function questsToJob(quests) {
  let job = {
    template: {},
    assets: [],
    actions: { postrender: [] },
  };

  // Template
  job.template = {
    src: 'file:///' + projectFilepath,
    composition: 'Main', // Fixed name
    outputModule: 'High Quality',
    outputExt: 'mov',
  };

  // Assets
  quests.forEach((pageQuests) => {
    pageQuests.forEach((q) => {
      let content;
      if (
        q.AE.type == 'image' ||
        q.AE.type == 'video' ||
        q.AE.type == 'audio'
      ) {
        content = {
          type: q.AE.type,
          src: q.AE.value.slice(0, 1)
            ? 'file://' + q.AE.value
            : 'file:///' + q.AE.value, // Change src path depends on first char ('/' or not)
          layerName: q.AE.layer,
          composition: q.AE.comp,
        };
      } else if (q.AE.type == 'data') {
        content = {
          type: 'data',
          layerName: q.AE.layer,
          property: q.AE.prop,
          value: q.AE.value,
          composition: q.AE.comp,
        };
      }
      job.assets.push(content);
    });
  });

  // Actions
  job.actions = {
    postrender: [
      {
        module: '@nexrender/action-encode',
        preset: 'mp4',
        output: projectFolderpath + '/preview.mp4',
        params: {
          '-r': fps,
        },
      },
    ],
  };

  // alert(JSON.stringify(job));

  return job;
}

function createFormData(data) {
  let content = {
    formTitle: 'Title',
    formDescription: 'Description',
    pages: 1,
    quests: [],
  };

  content.formTitle = data.formTitle;
  content.formDescription = data.formDescription;
  content.pages = data.quests.length;
  content.quests = data.quests.map((pageQuests) => {
    return pageQuests.map((q) => {
      return q.form;
    });
  });

  return content;
}

function uuid() {
  var d = Date.now();
  if (
    typeof performance !== 'undefined' &&
    typeof performance.now === 'function'
  ) {
    d += performance.now(); //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}
