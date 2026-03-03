import { Command } from 'commander'
import gendiff from './gendiff.js'

const buildCli = () => {
  const c = new Command()
  c
  .name('string-gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .option('-f, --format [type]', 'output format', 'stylish')
  .argument('filepath1')
  .argument('filepath2')
  .action((filepath1, filepath2, options) => {
    const formatName = options.format
    const diff = gendiff(filepath1, filepath2, formatName)
    console.log(diff)
  })

    return c
  }
  
export default buildCli