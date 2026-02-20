
import {Command} from 'commander'

export default () => {
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
      console.log(`format ${options.format}`)
      console.log(`filepathes: ${filepath1} ${filepath2}`)
    })

  c.parse()
}