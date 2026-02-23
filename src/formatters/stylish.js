import isPlainObject from '../functions.js'

export const stylish = (diff) => {
    const indents = {
        'added': '+',
        'deleted': '-',
        'changed': ' ',
        'unchanged': ' '
    }
    console.log(diff)
    return Object.keys(diff.data).reduce(
        (acc, key) => {
            if (diff[key] === 'changed') {
                const delKey = `${indents['deleted']} ${key}`
                const addKey = `${indents['added']} ${key}`
                acc[delKey] = file1[key]
                acc[addKey] = file2[key]
            } else if (isPlainObject(diff[key])) {
                
            } else {
                const status = diff[key]
                const indent = indents[status]
                const newKey = `${indent} ${key}`
                acc[newKey] = data[key]
            }
            return acc
        }
    , {})
}