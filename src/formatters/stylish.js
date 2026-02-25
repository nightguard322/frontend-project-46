import isPlainObject from '../functions.js'

export const stylish = (diff) => {
    const indents = {
        'added': '+',
        'deleted': '-',
        'common': ' ',
        'unchanged': ' '
    }
    const spacer = ' '
    const build = (innerDiff, innerLevel = 1) => {
        const spaces = spacer.repeat(innerLevel * 4 - 2)
        return Object.keys(innerDiff).reduce(
            (acc, key) => {
                const val = innerDiff[key]
                const status = val.status ?? "common"
                const data = val.data ?? val
                if  (status === 'nested' || isPlainObject(data)) {
                    const children = build(data, innerLevel + 1)
                    const innerSpace = spacer.repeat(innerLevel * 4) 
                    const innerStr = ['{', ...children, `${innerSpace}}`].join(`\n`)
                    const newKey = `${spaces}${indents['common']} ${key}`
                    acc.push(`${newKey}: ${innerStr}`)
                } else if (status === 'changed') { //Обьект
                    const [oldValue, newValue] = data
                    acc.push(`${spaces}${indents['deleted']} ${key}: ${oldValue}`)
                    acc.push(`${spaces}${indents['added']} ${key}: ${newValue}`)
                } else {
                    const newKey = `${indents[status]} ${key}`
                    acc.push(`${spaces}${newKey}: ${data}`)
                }
                return acc
            }
        , [])
    }
    const lines = ['{', ...build(diff), '}']
    return lines.join('\n')
}

    // return Object.keys(diff).reduce(
    //     (acc, key) => {
    //         const val = diff[key]
    //         const status = val.status
    //         const spaces = ' '.repeat(indentLevel * 4 - 2)
    //         const data = val.data
    //         if (status === 'changed') {
    //             const delKey = `${spaces}${indents['deleted']} ${key}`
    //             const addKey = `${spaces}${indents['added']} ${key}`
    //             const [oldValue, newValue] = data
    //             acc += [`${delKey}: ${oldValue}`, `${addKey}: ${newValue}`]
    //         } else if (status === 'nested') {
    //             const children = stylish(data, indentLevel + 1)
    //             const newKey = `${indents['common']} ${key}`
    //             const innerSpaces = spaces.repeat(2)
    //             acc += [`${spaces}${newKey}: {`, `${innerSpaces}${children}`, `${spaces}}`]
    //         } else {
    //             const newKey = `${indents[status]} ${key}`
    //             acc += `${spaces}${newKey}: ${data}`
    //         }
    //         return acc.join('\n')
    //         }
    // , [])
