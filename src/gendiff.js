
import { Command } from 'commander'
import { parse } from './parsers/parser.js';
import {stylish} from './formatters/stylish.js'
import isPlainObject from './functions.js'

const gendiff = () => {
  const c = new Command()
  c
    .name('string-gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.1.0')
    .option('-f, --format [type]', 'output format', 'stylish')
    .argument('filepath1')
    .argument('filepath2')
    .action((filepath1, filepath2) => {
      const options = c.opts()
      const diff = makeDiff(parse(filepath1), parse(filepath2))
    // console.log(JSON.stringify(diff, null, 2))
    console.log(stylish(diff))
    })
  
  c.parse()
}

const makeDiff = (file1, file2) => {
  const sortedKeys = new Set(
    [...Object.keys(file1), ...Object.keys(file2)]
    .sort()
  )
  
  const diff = {}
  sortedKeys.forEach(
    key => {
      const in1 = key in file1
      const in2 = key in file2
      const val1 = file1[key]
      const val2 = file2[key]
      if (!in2) {
        diff[key] = {status: 'deleted', data: file1[key]}
      }
      else if (!in1) {
        diff[key] = {status: 'added', data: file2[key]}
      }
      else {
        if (isPlainObject(val1) && isPlainObject(val2)) {
          diff[key] = {status: 'nested', data: makeDiff(val1, val2)}
        } else if (val1 === val2) {
          diff[key] = {status: 'unchanged', data: file1[key]}
        } else {
          diff[key] = {status: 'changed', data: [file1[key], file2[key]]}
        }
      }
    }
  )
  return diff
}

export { gendiff }