import * as path from 'path'
import * as fs from 'fs'

export const parser = (filepath) => {
  try {
    const fullpath = path.resolve(filepath)
    const file = fs.readFileSync(fullpath, 'utf-8')
    return JSON.parse(file)
  }
  catch (err) {
    console.log('Пробуем парсить yaml по пути:', filepath, 'но с файлом проблем!')
    if (err instanceof SyntaxError) {
      throw new Error(`file ${filepath} is not a valid JSON`, { cause: err })
    }
  }
}
