# better-regex

A regex engine built from scratch in vanilla JavaScript — a hand-written parser
and a backtracking matcher. No native `RegExp`, no dependencies. Built as a
learning project to understand how regex engines actually work under the hood.

## Install

    npm i @rabia_youcef/better-regex

## Usage

    const { match } = require("@rabia_youcef/better-regex")

    match("cat|dog", "cat")     // true
    match("a+b", "aaab")        // true
    match("colou?r", "color")   // true
    match("(ab)+", "abab")      // true
    match("(cat|dog)s", "dogs") // true
    match("a(b|c)d", "abd")     // true

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
| `( )` | grouping (with full nesting) |

## How it works

Two phases. A **parser** turns the pattern into a tree using recursive descent —
alternation, sequences, and groups each handled by their own function, with
groups recursing back into the parser so patterns can nest arbitrarily. Then a
**backtracking matcher** walks the tree against the input, threading the position
through each node and backing off when a greedy quantifier overshoots — the same
backtracking that powers real-world regex engines.

## Roadmap

- Character classes `[a-z]`
- Anchors `^` `$`
- Escape sequences `\d` `\w` `\s`

## License

MIT
