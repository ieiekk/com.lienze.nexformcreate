/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

// (function () {
//     'use strict';

//     var csInterface = new CSInterface();

//     function init() {

//         initColors();

//         $("#btn_test").click(function () {
//             csInterface.evalScript('sayHello()');
//         });
//     }

//     init();

// }());

// function quests() {
//   return [
//     {
//       uuid: uuidv4(),
//       form: {
//         title: 'Title',
//         description: 'Description',
//         type: 'singleLineText',
//         value: '請輸入文字內容',
//       },
//       AE: {
//         comp: 'Comp',
//         layer: 'Layer',
//         prop: 'Property',
//       },
//     },
//     {
//       uuid: uuidv4(),
//       form: {
//         title: 'Title',
//         description: 'Description',
//         type: 'multiLineText',
//         value: '請輸入文字內容',
//       },
//       AE: {
//         comp: 'Comp',
//         layer: 'Layer',
//         prop: 'Property',
//       },
//     },
//     {
//       uuid: uuidv4(),
//       form: {
//         title: 'Title',
//         description: 'Description',
//         type: 'selection',
//         value: ['選項一', '選項二', '選項三'],
//       },
//       AE: {
//         comp: 'Comp',
//         layer: 'Layer',
//         prop: 'Property',
//       },
//     },
//   ];
// }

document.addEventListener('alpine:init', () => {
  Alpine.data('Quests', () => ({
    quests: [
      // page 1
      [
        {
          form: {
            title: 'Title1',
            description: 'Description1',
            type: 'singleLineText',
            options: ['選項一', '選項二', '選項三'],
          },
          AE: {
            comp: 'Comp',
            layer: 'Layer',
            prop: 'Property',
            value: 'AE source text',
          },
        },
        {
          form: {
            title: 'Title2',
            description: 'Description2',
            type: 'multiLineText',
            options: ['選項一', '選項二', '選項三'],
          },
          AE: {
            comp: 'Comp',
            layer: 'Layer',
            prop: 'Property',
            value: 'AE source text multi-line',
          },
        },
        {
          form: {
            title: 'Title3',
            description: 'Description3',
            type: 'selection',
            options: ['選項一', '選項二', '選項三'],
          },
          AE: {
            comp: 'Comp',
            layer: 'Layer',
            prop: 'Property',
            value: 1,
          },
        },
        {
          form: {
            title: 'Title4',
            description: 'Description3',
            type: 'file',
            options: ['選項一', '選項二', '選項三'],
          },
          AE: {
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
          form: {
            title: 'Title1',
            description: 'Description1',
            type: 'singleLineText',
            options: ['選項一', '選項二', '選項三'],
          },
          AE: {
            comp: 'Comp',
            layer: 'Layer',
            prop: 'Property',
            value: 'AE source text',
          },
        },
        {
          form: {
            title: 'Title2',
            description: 'Description2',
            type: 'multiLineText',
            options: ['選項一', '選項二', '選項三'],
          },
          AE: {
            comp: 'Comp',
            layer: 'Layer',
            prop: 'Property',
            value: 'AE source text multi-line',
          },
        },
        {
          form: {
            title: 'Title3',
            description: 'Description3',
            type: 'selection',
            options: ['選項一', '選項二', '選項三'],
          },
          AE: {
            comp: 'Comp',
            layer: 'Layer',
            prop: 'Property',
            value: 1,
          },
        },
      ],
    ],

    currentPage: 1,

    addQuest() {
      this.quests[this.currentPage - 1].push({
        form: {
          title: 'Title3',
          description: 'Description3',
          type: 'selection',
          options: ['選項一', '選項二', '選項三'],
        },
        AE: {
          comp: 'Comp',
          layer: 'Layer',
          prop: 'Property',
          value: 1,
        },
      });
    },
  }));
});
