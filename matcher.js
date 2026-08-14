"use strict"
const { Parser } = require('./parser.js')

function matchSeq(nodes, index, input, pos) {
    if (index >= nodes.length) return pos
    const node = nodes[index]

    if (node.type === "char") {
        if (input[pos] === node.value) return matchSeq(nodes, index + 1, input, pos + 1)
        return -1
    }

    if (node.type === "dot") {
        if (pos < input.length) return matchSeq(nodes, index + 1, input, pos + 1)
        return -1
    }

    if (node.type === "concat") {
        let inner = matchSeq(node.children, 0, input, pos)
        if (inner === -1) return -1
        return matchSeq(nodes, index + 1, input, inner)
    }

    if (node.type === "star") {
        let stops = [pos]
        let p = pos
        while (true) {
            let next = matchNode(node.child, input, p)
            if (next === -1 || next === p) break
            p = next
            stops.push(p)
        }
        for (let k = stops.length - 1; k >= 0; k--) {
            let result = matchSeq(nodes, index + 1, input, stops[k])
            if (result !== -1) return result
        }
        return -1
    }

    if (node.type === "plus") {
        let stops = [pos]
        let p = pos
        while (true) {
            let next = matchNode(node.child, input, p)
            if (next === -1 || next === p) break
            p = next
            stops.push(p)
        }
        if (stops.length === 1) return -1
        for (let k = stops.length - 1; k >= 0; k--) {
            let result = matchSeq(nodes, index + 1, input, stops[k])
            if (result !== -1) return result
        }
        return -1
    }

    if (node.type === "optional") {
        let stops = [pos]
        let next = matchNode(node.child, input, pos)
        if (next !== -1 && next !== pos) stops.push(next)
        for (let k = stops.length - 1; k >= 0; k--) {
            let result = matchSeq(nodes, index + 1, input, stops[k])
            if (result !== -1) return result
        }
        return -1
    }

    if (node.type === "or") {
        let leftResult = matchSeq([node.left], 0, input, pos)
        if (leftResult !== -1) {
            let rest = matchSeq(nodes, index + 1, input, leftResult)
            if (rest !== -1) return rest
        }
        let rightResult = matchSeq([node.right], 0, input, pos)
        if (rightResult !== -1) {
            let rest = matchSeq(nodes, index + 1, input, rightResult)
            if (rest !== -1) return rest
        }
        return -1
    }

    return -1
}

function matchNode(node, input, pos) {
    if (node.type === "char") return input[pos] === node.value ? pos + 1 : -1
    if (node.type === "dot")  return pos < input.length ? pos + 1 : -1
    return -1
}

function match(pattern, input) {
    const tree = Parser(pattern)
    const nodes = tree.type === "or" ? [tree] : tree.children
    const end = matchSeq(nodes, 0, input, 0)
    return end === input.length
}

module.exports = { match }
