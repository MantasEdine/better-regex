"use strict";

function Parser(exp) {
  let i = 0;

  function isRegexSpecial(ch) {
    const specials = [
      "\\",
      "^",
      "$",
      ".",
      "|",
      "?",
      "*",
      "+",
      "(",
      ")",
      "[",
      "]",
      "{",
      "}",
    ];
    return specials.includes(ch);
  }
  function isLetter(ch) {
    const code = ch.charCodeAt(0);
    return (
      (code >= 0x41 && code <= 0x5a) ||
      (code >= 0x61 && code <= 0x7a) ||
      (code >= 0x30 && code <= 0x39)
    );
  }
  function parseSequence() {
    let charArr = [];
    while (i < exp.length && exp[i] !== ")" && exp[i] !== "|") {
      if (isLetter(exp[i])) {
        charArr.push({ type: "char", value: exp[i] });
        i++;
      } else if (exp[i] === ".") {
        charArr.push({ type: "dot" });
        i++;
      } else if (exp[i] === "*") {
        charArr.push({ type: "star", child: charArr.pop() });
        i++;
      } else if (exp[i] === "+") {
        charArr.push({ type: "plus", child: charArr.pop() });
        i++;
      } else if (exp[i] === "?") {
        charArr.push({ type: "optional", child: charArr.pop() });
        i++;
      } else if (exp[i] === "(") {
        i++;
        const sub = parseOr();
        i++;
        charArr.push(sub);
      } else {
        i++;
      }
    }
    return { type: "concat", children: charArr };
  }

  function parseOr() {
    let left = parseSequence();
    if (exp[i] === "|") {
      i++;
      let right = parseOr();
      return { type: "or", left, right };
    }
    return left;
  }

  return parseOr();
}

module.exports = { Parser };
