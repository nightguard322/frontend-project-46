import isPlainObject from '../functions.js'

export default (diff) => {
    const prepare = (v) => {
        if (isPlainObject(v)) {
            return '[complex value]'
        }
        if (v === null || typeof v === 'boolean') {
            return v
        }
        return `'${v}'`
        }

    const render = (name, node) => {
        const actions = {
            'added': (node) => `Property '${name}' was added with value: ${prepare(node.new)}`,
            'deleted': () => `Property '${name}' was removed`,
            'changed': (node) => `Property '${name}' was updated. From ${prepare(node.old)} to ${prepare(node.new)}`
        }
        const status = node.status
        if (status in actions) {
            return actions[status](node)
        }
    }
    const traverse = (parentName, node, fullpath = '') => {
        fullpath = fullpath.length === 0 ? parentName : `${fullpath}.${parentName}`
        if (node.status) {
            if (node.status === 'nested') {
                const children = node.children
                const lines = Object.keys(children)
                    .map(name => {
                        const line = traverse(name, children[name], fullpath)
                        return line ? line.trim() : ''
                    })
                    .filter(line => line)
                return lines.join('\n')
            }
            return render(fullpath, node)
        }
    }

    const lines = Object.keys(diff)
        .map(name => traverse(name, diff[name]))
    return lines.join('\n')
}
