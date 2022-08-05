/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/


document.addEventListener('alpine:init', () => {
  Alpine.data('Quests', function () {
    return {
      data: this.$persist({
        formTitle: 'Test Title',
        formDescription: 'Test Description',
        quests: [
          // page 1
          [
            {
              uuid: uuid(),
              form: {
                title: 'Title1',
                description: 'Description1',
                type: 'singleLineText',
                options: ['選項一', '選項二', '選項三'],
              },
              AE: {
                type: 'data',
                comp: 'Comp',
                layer: 'Layer',
                prop: 'Property',
                value: 'AE source text',
              },
            },
            {
              uuid: uuid(),
              form: {
                title: 'Title2',
                description: 'Description2',
                type: 'multiLineText',
                options: ['選項一', '選項二', '選項三'],
              },
              AE: {
                type: 'data',
                comp: 'Comp',
                layer: 'Layer',
                prop: 'Property',
                value: 'AE source text multi-line',
              },
            },
            {
              uuid: uuid(),
              form: {
                type: 'data',
                title: 'Title3',
                description: 'Description3',
                type: 'selection',
                options: ['選項一', '選項二', '選項三'],
              },
              AE: {
                type: 'data',
                comp: 'Comp',
                layer: 'Layer',
                prop: 'Property',
                value: 1,
              },
            },
            {
              uuid: uuid(),
              form: {
                title: 'Title4',
                description: 'Description3',
                type: 'file',
                options: ['選項一', '選項二', '選項三'],
              },
              AE: {
                type: 'video',
                comp: 'Comp',
                layer: 'Layer',
                prop: 'Property',
                value: '~/path/to/thisFile.mp4', // For footage, it's the filepath
              },
            },
          ],
          // page 2
          [
            {
              uuid: uuid(),
              form: {
                title: 'Title1',
                description: 'Description1',
                type: 'singleLineText',
                options: ['選項一', '選項二', '選項三'],
              },
              AE: {
                type: 'data',
                comp: 'Comp',
                layer: 'Layer',
                prop: 'Property',
                value: 'AE source text',
              },
            },
            {
              uuid: uuid(),
              form: {
                title: 'Title2',
                description: 'Description2',
                type: 'multiLineText',
                options: ['選項一', '選項二', '選項三'],
              },
              AE: {
                type: 'data',
                comp: 'Comp',
                layer: 'Layer',
                prop: 'Property',
                value: 'AE source text multi-line',
              },
            },
            {
              uuid: uuid(),
              form: {
                title: 'Title3',
                description: 'Description3',
                type: 'selection',
                options: ['選項一', '選項二', '選項三'],
              },
              AE: {
                type: 'data',
                comp: 'Comp',
                layer: 'Layer',
                prop: 'Property',
                value: 1,
              },
            },
          ],
        ],
      }),

      currentPage: this.$persist(1),

      addQuest() {
        const emptyQuest = {
          uuid: uuid(),
          form: {
            title: 'Title3',
            description: 'Description3',
            type: 'selection',
            options: ['選項一', '選項二', '選項三'],
          },
          AE: {
            type: 'data',
            comp: 'Comp',
            layer: 'Layer',
            prop: 'Property',
            value: 1,
          },
        };

        if (this.data.quests.length === 0) {
          this.data.quests.push([emptyQuest]);
        } else {
          this.data.quests[this.currentPage - 1].push({
            uuid: uuid(),
            form: {
              title: 'Title3',
              description: 'Description3',
              type: 'selection',
              options: ['選項一', '選項二', '選項三'],
            },
            AE: {
              type: 'data',
              comp: 'Comp',
              layer: 'Layer',
              prop: 'Property',
              value: 1,
            },
          });
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

        setTimeout(() => {
          alert(JSON.stringify(this.data));
        }, 100);
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
