#!/usr/bin/env node

import buildCli from '../src/gendiff.js'

const cli = buildCli();
cli.parse();