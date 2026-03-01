import isPlainObject from '../functions.js'

export default (diff) => {
    const indents = {
        'added': '+',
        'deleted': '-',
        'common': ' ',
        'unchanged': ' '
    }

    const build = (innerDiff) => {
        const print = (key, v, status) => {
            status = (status in indents) ? status : "common"
            const node = {}
            if (isPlainObject(v)) {
                const children = v.children ?? v
                const preparedChildren = build(children)
                const newKey = `${indents[status]} ${key}`
                node[newKey] = preparedChildren
            } else {
                const newKey = `${indents[status]} ${key}`
                node[newKey] = v
            }
            return node
        }

        const getData = (k, obj) => {
            const status = obj.status
            switch (status) {
                case 'deleted':
                case 'unchanged':
                    return print(k, obj.old, status)
                case 'added': 
                    return print(k, obj.new, status)
                case 'changed': 
                    return {
                        ...print(k, obj.old, 'deleted'), 
                        ...print(k, obj.new, 'added')
                    }
                case 'nested': 
                    return print(k, obj.children, status)
                case 'plain': return print(k, obj.data, status)
            }
                
        }
        let res = {}
        Object.keys(innerDiff)
            .forEach(key => {
                const v = innerDiff[key] //либо обьект либо значение
                const preparedData = v.status ? v : {status: 'plain', data: v}
                const elem = getData(key, preparedData)
                res = {...res, ...elem}
        });
        
        return res
    }
    return JSON.stringify(build(diff), null, 2)
}
