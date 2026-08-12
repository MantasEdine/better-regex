"use strict"


function Parser(exp){


    function isRegexSpecial(ch) {
         const specials = ['\\', '^', '$', '.', '|', '?', '*', '+', '(', ')', '[', ']', '{', '}']
         return specials.includes(ch)
   }
    let operation_type = 0
    for(let i = 0 ; i<exp.length ; i++){
        if(isRegexSpecial(exp[i])){
                
            operation_type += 1
            
        }

    }
    console.log(operation_type)
    
        console.log("im here1")

  function basicConcat(exp){

            console.log("im here3")
                let charArr = []


     function isLetter(ch) {
         const code = ch.charCodeAt(0)
         return (code >= 0x41 && code <= 0x5A) ||  // A-Z (65-90)
                (code >= 0x61 && code <= 0x7A) ||
                (code >= 0x30 && code <= 0x39)
     }
    let i = 0
    while(i < exp.length && isLetter(exp[i])){
            
        const Char = {type : "char", value : exp[i]}
        charArr.push(Char)
        i++
            
    }
      const expression = {type : "concat" , children : charArr}
        console.log(expression)
        return expression    
  }
    if(operation_type === 0){
        console.log("im here2")
        return basicConcat(exp)
    }else {
        return "null"
    }    

}     


module.exports = {Parser};
