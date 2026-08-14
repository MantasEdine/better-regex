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
    
    if(node.type === "plus"){

        let stops = [pos]
        let p = pos
        while (true) {
            let next = matchNode(node.child, input, p)
            if (next === -1 || next === p) break
            p = next
            stops.push(p)
        }
        if(stops.length === 1) return -1
        for (let k = stops.length - 1; k >= 0; k--) {
            let result = matchSeq(nodes, index + 1, input, stops[k])
            if (result !== -1) return result
        }
        return -1
       
    }

    if(node.type === "optional"){
        let stops = [pos]                                // option 1: skip the child (zero)
        let next = matchNode(node.child, input, pos)     // try matching ONCE
        if(next !== -1 && next !== pos) stops.push(next)  // option 2: took it (one)
        for(let k = stops.length - 1; k >= 0; k--){
            let result = matchSeq(nodes, index + 1, input, stops[k])
            if(result !== -1) return result
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
    const end = matchSeq(tree.children, 0, input, 0)
    return end === input.length
}

module.exports = { match }
