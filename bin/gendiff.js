#!/usr/bin/env node

import buildCli from '../src/cli.js'

const cli = buildCli();
cli.parse();