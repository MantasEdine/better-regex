"use strict"
const { match } = require("./index.js")
let pass = 0, fail = 0
function t(p, i, e) {
    const r = match(p, i)
    if (r === e) { pass++ }
    else { fail++; console.log("❌", `match("${p}","${i}") = ${r} | want ${e}`) }
}
t("abc","abc",true); t("abc","abd",false)
t("c.t","cat",true); t("c.t","czt",true); t("c.t","ca",false)
t("a*b","aaab",true); t("a*b","b",true); t("a*a","aaa",true); t("a*","",true); t("a*b","aaa",false)
t("a+","a",true); t("a+","aaa",true); t("a+","",false); t("a+b","b",false)
t("a?b","ab",true); t("a?b","b",true); t("a?a","aa",true); t("a?","aa",false)
t("cat|dog","cat",true); t("cat|dog","dog",true); t("cat|dog","cot",false); t("cat|dog","catt",false)
t("a|b|c","a",true); t("a|b|c","b",true); t("a|b|c","c",true); t("a|b|c","d",false)
t(".*","abc",true); t("a+b?c*","aabc",true); t("colou?r","colour",true); t("colou?r","colouur",false)
console.log(`\n${pass} passed, ${fail} failed`)
process.exit(fail > 0 ? 1 : 0)
