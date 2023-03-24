/**
 * @description Script to generate asset icon with require function
 * @param urls: array of asset folder need to be indexing with generated asset
 *
 * Usage
 *   cd scripts && node image.script.js ./src/assets/images && cd ../
 *
 * Output: icon-facebook.png => export const ICON_FACEBOOK = require('./icon-facebook.png');
 */

// require("../src/assets/images/explore/")

const fs = require('fs');
const path = require('path');
const [folder] = process.argv.slice(2);
const dirname = path.dirname(__dirname);
const dir = `${dirname}/${folder}`;

function replaceAll(raw, regex, replace) {
  while (raw.includes(regex)) {
    raw = raw.replace(regex, replace);
  }
  return raw;
}

fs.readdir(dir, (err, files) => {
  if (err) {
    console.log('Error while reading file. Please check the inputted path');
    return;
  }
  let arr = dir.split('/');
  let nameFolder = arr[arr.length - 1];
  if (nameFolder.length <= 0) {
    console.log('link fail');
    return;
  }
  const requireItems = files
    .filter(x => !x.includes('@') && x.includes('.png'))
    .map(file => {
      const name = replaceAll(file, '-', '_').replace('.png', '');
      // .toUpperCase();
      return `export const img_${nameFolder}_${name} = require('./${file}')`;
    });
  const outputName = `${dir}/index.ts`;
  fs.writeFile(outputName, requireItems.join(';\n').concat(';\n'), wError => {
    console.log(wError ? wError : 'Success');
  });
});
