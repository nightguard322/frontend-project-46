import plain from './plain.js'
import {makeDiff} from '../gendiff.js'
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
import {parse} from '../parsers/parser.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const loadFixture = (filename) => {
    const filePath = join(__dirname, '..', 'fixtures', filename)
    return parse(filePath)
    
}

describe('plain', () => {
    let file1, file2, expectedOutput
    beforeAll (()=> {
        file1 = loadFixture('nestedFile1.json')
        file2 = loadFixture('nestedFile2.json')
        expectedOutput = loadFixture('expectedPlain.txt').trim()
    })

    test('getFormattedDiff', () => {
        const diff = makeDiff(file1, file2)
        const result = plain(diff)
        expect(result).toEqual(expectedOutput)
    })
})  
