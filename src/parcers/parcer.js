import path from 'path'
import {parser as parseJson} from 'json.js'
import {parser as parseYaml} from 'yml.js'

const parsers = {
    'json': parseJson,
    'yml': parseYaml,
    'yaml': parseYaml
}

export default (filepath) => {
    const ext = path.extname(filepath)
    if (!ext in parsers) {
        throw new Error(`unknown file format - ${ext}`)
    }
    return parsers[ext]
}