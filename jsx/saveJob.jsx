//@include '../js/libs/json2.js';

function saveJob() {
  var os = $.os.split('/')[0];

  var jobFile;
  if (os == 'Windows') {
    jobFile = new File('C:/Users/Public/Documents/exampleJob.json');
  } else {
    jobFile = new File('/Users/Shared/exampleJob.json');
  }
  jobFile.encoding = 'UTF8';
  jobFile.open('w');
  jobFile.write('__jobContent__');
  jobFile.close();
}

saveJob();
