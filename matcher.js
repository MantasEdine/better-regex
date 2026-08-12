"use strict"
const { Parser } = require('./parser.js')


function Matcher(input, exp){
    let match = 0


    let res = Parser(exp)
    console.log(res)
    console.log("im here4")    
    if(res.type === "concat"){
        let str = ""
        let i = 0
        let arr = res.children
        console.log(arr)
        while(i < arr.length){
               
            str += arr[i].value
            i++

        }
        console.log(str)
        console.log(str[0])
       let j = 0 
        while (j < input.length){
        
            if(input[j] === str[0] && input.slice(j,j + str.length) === str){
                match++
                console.log("one_shot")
                j += str.length
            }else {
                j++
            }
            
        }

        return match
    }else {
        return null
    } 

}

const result = Matcher("cat","c.t")
console.log(result)
