import isPlainObject from '../functions.js'

export const stylish = (diff) => {
    const indents = {
        'added': '+',
        'deleted': '-',
        'common': ' ',
        'unchanged': ' '
    }
    return Object.keys(diff).reduce(
        (acc, key) => {
            const val = diff[key]
            const status = val.status
            const data = val.data
            console.log(status)
            if (status === 'changed') {
                const delKey = `${indents['deleted']} ${key}`
                const addKey = `${indents['added']} ${key}`
                const [oldValue, newValue] = data
                acc[delKey] = oldValue
                acc[addKey] = newValue
            } else if (status === 'nested') {
                const children = stylish(data)
                const newKey = `${indents['common']} ${key}`
                acc[newKey] = children
            } else {
                const newKey = `${indents[status]} ${key}`
                acc[newKey] = data
            }
            return acc
            }
        
    , {})
}