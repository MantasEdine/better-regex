"use strict"

function Parser(exp){

  function isRegexSpecial(ch) {
         const specials = ['\\', '^', '$', '.', '|', '?', '*', '+', '(', ')', '[', ']', '{', '}']
         return specials.includes(ch)
   }
  function isLetter(ch) {
         const code = ch.charCodeAt(0)
         return (code >= 0x41 && code <= 0x5A) ||
                (code >= 0x61 && code <= 0x7A) ||
                (code >= 0x30 && code <= 0x39)
   }

  function basicConcat(exp , index) {
    let charArr = []
    let i = index || 0    

    while (i < exp.length) {
        if (isLetter(exp[i])) {
            charArr.push({type:"char", value: exp[i]})
            i++
        } else if (exp[i] === ".") {
            charArr.push({type:"dot"})
            i++
        } else if (exp[i] === "*") {
            const prev = charArr.pop()
            charArr.push({type:"star", child: prev})
            i++
        }else if(exp[i] === "+"){
            let prev = charArr.pop()
            charArr.push({type : "plus" , child : prev})
            i++
        }else if(exp[i] === "?"){
            let prev = charArr.pop()
            charArr.push({type : "optional" , child : prev})
            i++
        } else if (exp[i] === "|") {
            const left = {type:"concat", children: charArr}   // what we built so far = left
            const right = basicConcat(exp, i + 1)              // parse rest = right
            return {type:"or", left: left, right: right}       // return or, STOP
        }else {
            return "not yet !"
        }

    }
    return {type:"concat", children: charArr}
   }
   return basicConcat(exp)
}

module.exports = {Parser};
