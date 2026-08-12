"use strict"


function Prarser(exp){

  function basicConcat(exp){


                let charArr = []


     function isLetter(ch) {
         const code = ch.charCodeAt(0)
         return (code >= 0x41 && code <= 0x5A) ||  // A-Z (65-90)
                (code >= 0x61 && code <= 0x7A) ||
                (0 <= ch && ch <= 9)
     }
    let i = 0
    while(i < exp.length && isLetter(exp[i])){
            
        const Char = charArr.push(exp[i])    
        i++
            
    }
      const expression = {type : "Concat" , value : charArr}

    
  }

}
