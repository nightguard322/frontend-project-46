import path from path
import fs from fs

export const parser = (filepath) => {
    try {
        const fullpath = path.resolve(filepath)
        const file = fs.readFileSync(fullpath, 'utf-8')
        return JSON.parse(file)
    } catch (err){
        if (err instanceof SyntaxError) {
            throw new Error(`file ${fullpath} is not a valid JSON`)
        }
    }
}