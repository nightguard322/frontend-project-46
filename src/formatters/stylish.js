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
        const print = (key, v, status) => {
            status = (status in indents) ? status : "common"
            if (isPlainObject(v)) {
                const children = v.children ?? v
                const preparedChildren = build(children, innerLevel + 1)
                const innerSpace = spacer.repeat(innerLevel * 4) 
                const innerStr = ['{', ...preparedChildren, `${innerSpace}}`].join(`\n`)
                const newKey = `${spaces}${indents[status]} ${key}`
                return `${newKey}: ${innerStr}`
            } else {
                const newKey = `${indents[status]} ${key}`
                return `${spaces}${newKey}: ${v}`
            }
        }
        const getData = (k, obj) => {
            const status = obj.status
            switch (status) {
                case 'deleted':
                case 'unchanged':
                    return print(k, obj.old, status)
                case 'added': 
                    return print(k, obj.new, status)
                case 'changed': return [
                        print(k, obj.old, status), print(k, obj.new, status)
                    ].join('\n')
                case 'nested': return print(k, obj.children, status)
                case 'plain': return print(k, obj.data, status)
            }
                
        }
        return Object.keys(innerDiff).reduce(
            (acc, key) => {
                const v = innerDiff[key] //либо обьект либо значение
                const preparedData = v.status ? v : {status: 'plain', data: v}
                const toAdd = getData(key, preparedData)
                acc.push(toAdd)
                return acc
        }, [] )
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
