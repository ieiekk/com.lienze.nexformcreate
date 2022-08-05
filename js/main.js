/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

var csInterface = new CSInterface();

let AESource = {
  type: 'Type',
  comp: 'Comp',
  layer: 'Layer',
  prop: 'Prop',
  value: 'Value',
};

/* Helper function to create and return a promise object */
function runEvalScript(script) {
  return new Promise(function (resolve, reject) {
    csInterface.evalScript(script, resolve);
  });
}

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
            type: 'data',
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
        const modalBody = document.getElementById('modal-body');
        modalBody.innerText = 'Submitting...';
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
document.getElementById('btn-test').addEventListener('click', () => {
  updateAESource();
});
document.getElementById('btn-add').addEventListener('mouseenter', () => {
  updateAESource();
});

// Utils

function updateAESource() {
  csInterface.evalScript('updateAESource()', (res) => {
    AESource = JSON.parse(res);
  });
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
