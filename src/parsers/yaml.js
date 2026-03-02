import * as path from 'path'
import * as fs from 'fs'
import yaml from 'js-yaml'

export const parser = (filepath) => {
  try {
    const fullpath = path.resolve(filepath)
    const file = fs.readFileSync(fullpath, 'utf-8')
    return yaml.load(file)
  }
  catch (err) {
    if (err instanceof yaml.YAMLException) {
      throw new Error(`file ${filepath} is not a valid YAML`, { cause: err })
    }
  }
}
