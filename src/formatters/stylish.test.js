import {fileURLToPath} from 'url'
import {join, dirname} from 'path'
import { stylish } from './stylish.js'
import { makeDiff } from '../gendiff.js'
import { parse } from '../parsers/parser.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixture = (name) => {
    const fullpath = join(__dirname, '..', 'fixtures', name)
    return parse(fullpath)
}
describe('stylish test', () => {
    let file1, file2, expectedOutput
    beforeAll(() => {
        file1 = getFixture('nestedFile1.json')
        file2 = getFixture('nestedFile2.json')
        expectedOutput = getFixture('expectedStylish.txt')
    })
    test('stylish diff', () => {
        const diff = makeDiff(file1, file2)
        const result = stylish(diff)
        expect(result).toBe(expectedOutput)
    })
})