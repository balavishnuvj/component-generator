#!/usr/bin/env node

const path = require('path');

const plopFilePath = path.join(__dirname, '../src/index.js');
process.argv.push('--plopfile', plopFilePath);
const args = process.argv.slice(2);
const { Plop, run } = require('plop');
const argv = require('minimist')(args);

Plop.launch(
  {
    cwd: argv.cwd,
    configPath: argv.plopfile,
    require: argv.require,
    completion: argv.completion,
  },
  run,
);
