"use strict"
const { Parser } = require('./parser.js')

function matchNode(node, input, pos) {
    if (node.type === "char") {
        if (input[pos] === node.value) return pos + 1
        return -1
    }

    if (node.type === "dot") {
        if (pos < input.length) return pos + 1
        return -1
    }

    if (node.type === "star") {
      while (true) {
         let next = matchNode(node.child, input, pos)
         if (next === -1) break     
         pos = next                  
       }
        return pos                  
    }
    if (node.type === "concat") {
        for (let child of node.children) {
            pos = matchNode(child, input, pos)   
            if (pos === -1) return -1
        }
        return pos
    }
}
function match(pattern, input) {
    const tree = Parser(pattern)
    const end = matchNode(tree, input, 0)
    return end === input.length
}

module.exports = { match }
