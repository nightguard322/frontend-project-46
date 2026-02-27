import isPlainObject from '../functions.js'

export default (diff) => {
    const getData = (v, k) => {
        const status = v.status ?? 'none'
        if (status === 'deleted')
            return `Property '${k}' was removed`

        switch(status) {
            case 'added':
                v = isPlainObject(v.new) ? '[complex value]' : v.new
                console.log('added >>>', `Property '${k}' was added with value: ${v}`)
                return `Property '${k}' was added with value: ${v}`
            case 'changed': 
                Object.keys(v).forEach((innerK) => {
                    if (isPlainObject(v[innerK])) {
                        v[innerK] = '[complex value]'
                    }
                })
                console.log('changed >>>>', `Property '${k}' was updated. From ${v.old} to ${v.new}`)
                return `Property '${k}' was updated. From ${v.old} to ${v.new}`
            case 'nested':
                const children = v.children
                const res = Object.keys(children).map(childName => getData(children[childName], `${k}.${childName}`))
                console.log('nested >>>>', res)
                return res.join('\n')
            default: 
                console.log('Undefined??>>>>>')
                return ''
        }
    }

        const lines = Object.keys(diff).reduce(
            (res, k) => { //k = common
                const v = diff[k] //status + oldV+ newV+ children
                res.push(getData(v, k))
                return res
            }, []
        )
    return lines.join('\n')
}
//