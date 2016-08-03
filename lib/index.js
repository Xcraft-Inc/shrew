'use strict';

const fs   = require ('fs');
const path = require ('path');

const npmEnv      = 'npm_package_name';
const packageName = process.env[npmEnv];
let location      = path.resolve (__dirname, '../..');

function isGoodLocation (location, packageName) {
  try {
    const pkgDef = JSON.parse (fs.readFileSync (path.join (location, 'package.json')));
    return pkgDef.name === packageName;
  } catch (ex) {
    return false;
  }
}

function moduleRoot () {
  const locations = location.split (path.sep);

  while (locations.length > 0) {
    const loc = locations.join (path.sep);

    if (isGoodLocation (loc, packageName)) {
      return loc;
    }

    locations.splice (-1, 1);
  }

  return null;
}

module.exports = moduleRoot;
