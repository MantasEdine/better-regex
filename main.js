const { match } = require("./matcher.js")



function main(){
  match("a+", "a")        // one a
  match("a+", "aaa")      // many a's
  match("a+b", "ab")      // one a then b
  match("a+b", "aaab")    // many a then b
  match("ab+", "abbb")    // a then many b
  match("a+b+", "aabbb")  // both plus   
}

main()
