# better-regex

A regex engine built from scratch in vanilla JavaScript — a hand-written parser
and a backtracking matcher. No native `RegExp`, no dependencies.

## Install

    npm i @rabia_youcef/better-regex

## Usage

    const { match } = require("@rabia_youcef/better-regex")

    match("cat|dog", "cat")    // true
    match("a+b", "aaab")       // true
    match("colou?r", "color")  // true
    match("c.t", "czt")        // true

`match(pattern, input)` returns `true` if the pattern matches the **entire**
input string, else `false`.

## Supported

| Syntax | Meaning |
|---|---|
| `abc` | literal characters |
| `.` | any single character |
| `*` | zero or more |
| `+` | one or more |
| `?` | zero or one |
| `\|` | alternation (or) |

## How it works

Two phases. A **parser** turns the pattern into a tree using recursive descent.
Then a **backtracking matcher** walks the tree against the input, threading the
position through each node and backing off when a greedy quantifier overshoots —
the same backtracking that powers real-world regex engines.

## Roadmap

- Groups `( )`
- Character classes `[a-z]`
- Anchors `^` `$`

## License

MIT
