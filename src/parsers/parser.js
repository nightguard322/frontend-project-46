import * as path from 'path';
import {parser as parseJson} from './json.js'
import {parser as parseYaml} from './yaml.js'

const parsers = {
    '.json': (filepath => parseJson(filepath)),
    '.yml': (filepath => parseYaml(filepath)),
    '.yaml': (filepath => parseYaml(filepath))
}

export const parse = (filepath) => {
    const ext = path.extname(filepath)
    if (!(ext in parsers)) {
        throw new Error(`unknown file format - ${ext}`)
    }
    return parsers[ext](filepath)
}