const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const webfontsGenerator = require('webfonts-generator');
const {promisify} = require('util');

const copyFile = promisify(fs.copyFile);
const readdir = promisify(fs.readdir);

const iconPath = '../src/icons';
const distPath = '../dist';
const destPath = '../../ququmber-www/fonts/ququmber-icons/';
const iconMatch = /^.*\.(svg)$/;

const getIconFiles = async () => {
  const absoluteIconPath = path.resolve(iconPath, '');
  const filenames = await readdir(absoluteIconPath);
  console.log("found icons:");
  filenames.map(filename => console.log(filename));
  const filepaths = filenames.map(filename => path.resolve(absoluteIconPath, filename));
  return _.filter(filepaths, filepath => filepath.match(iconMatch));
};

const generateFont = () => new Promise(async (resolve, reject) => {
  const iconFiles = await getIconFiles();
  webfontsGenerator({
    files: iconFiles,
    dest: '../dist/',
    fontName: 'ququmber-icons',
    templateOptions: {
      baseSelector: '.qqico',
      classPrefix: 'qqico-',
    }
  }, function(error) {
    if (error) {
      console.log('generate-icons.js failed', error);
      reject(error);
    } else {
      console.log('generate-icons.js succeeded');
      resolve();
    }
  });
});

const copyToWww = async () => {
  const absoluteDistPath = path.resolve(distPath, '');
  const allFilenames = await readdir(absoluteDistPath);
  const allFilepaths = allFilenames.map(filename => path.resolve(absoluteDistPath, filename));
  const filteredFiles = _.filter(allFilepaths, filepath => filepath.indexOf('ququmber-icons.') > -1);
  await Promise.all(filteredFiles.map(async filepath => {
    const filename = filepath.substring(absoluteDistPath.length + 1);
    const dest = destPath + filename;
    console.log('Copying ' + filepath + " => " + dest);
    await copyFile(filepath, dest);
  }));
};

const run = async () => {
  await generateFont();
  await copyToWww();
};

run();
