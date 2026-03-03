import { parse } from './parsers/parser.js'
import { stylish } from './formatters/stylish.js'
import plain from './formatters/plain.js'
import toJson from './formatters/json.js'
import isPlainObject from './functions.js'

const chooseFormat = {
  stylish: diff => stylish(diff),
  plain: diff => plain(diff),
  json: diff => toJson(diff),
}

const makeDiff = (file1, file2) => {
  const sortedKeys = new Set(
    [...Object.keys(file1), ...Object.keys(file2)]
      .sort(),
  )

  const diff = {}
  sortedKeys.forEach(
    (key) => {
      const in1 = key in file1
      const in2 = key in file2
      const val1 = file1[key]
      const val2 = file2[key]
      if (!in2) {
        diff[key] = { status: 'deleted', old: file1[key], new: null, children: null }
      }
      else if (!in1) {
        diff[key] = { status: 'added', old: null, new: file2[key], children: null }
      }
      else {
        if (isPlainObject(val1) && isPlainObject(val2)) {
          diff[key] = { status: 'nested', old: null, new: null, children: makeDiff(val1, val2) }
        }
        else if (val1 === val2) {
          diff[key] = { status: 'unchanged', old: file1[key], new: null, children: null }
        }
        else {
          diff[key] = { status: 'changed', old: file1[key], new: file2[key], children: null }
        }
      }
    },
  )
  return diff
}

export default (filepath1, filepath2, format = 'stylish') => {
  const file1 = parse(filepath1)
  const file2 = parse(filepath2)
  const diff = makeDiff(file1, file2)
  const action = chooseFormat[format]
  return action(diff)
}
