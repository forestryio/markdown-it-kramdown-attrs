import { parse as shellParser } from "shell-quote"
const globalRe = /(?:\s*|\n*){:([^}]+)}(?:\n|$)/g
const singleRe = /(?:\s*|\n*){:([^}]+)}(?:\n|$)/

// --
// Make an array uniq.
// --

function arrayUniq(array) {
  return array.filter((v, i, a) => {
    return a.indexOf(v) === i
  })
}

// --
// Strip the {: } from the content.
// --

function stripCurly(token) {
  let children = [], childFound
  token.content.replace(
    singleRe, ""
  )

  token.children.forEach((child, i) => {
    if (child.type == "text" && child.content.match(singleRe)) {
      childFound = true; child.content = child.content.replace(singleRe, "")
      if (child.content != "") {
        children.push(
          child
        )
      }

      else {
        let previousChild = children[children.length - 1]
        if (previousChild && previousChild.type == "softbreak") {
          children.pop(
            //
          )
        }
      }
    }

    else if (!(childFound && child.type == "softbreak")) {
      children.push(
        child
      )
    }
  })

  token.children = children
}

// --
// Parse the attributes from {:.class #id key=val}
// into the parent and as a part of the context.
// --

function parseAttrs(state) {
  if (state.tokens) {
    state.tokens.forEach((token, i) => {
      if (token.block && token.type == "inline") {
        let attrMatches = token.content.match(globalRe)
        if (attrMatches && attrMatches.length > 0) {
          stripCurly(token)

          attrMatches.forEach((attrs) => {
            attrs = shellParser(attrs.match(singleRe)[1].replace(/#/, "\\#"))

            // --
            // Grab the parent.
            // --

            let parent = state.tokens[i - 1]
            if (!parent.attrs) {
              parent.attrs = [
                //
              ]
            }

            // --

            attrs.forEach((attr) => {
              if (attr.match(/^\s*\./)) {
                let classes

                parent.attrs.forEach((ary) => {
                  if (ary[0] == "class") classes = ary
                })

                if (!classes) {
                  parent.attrs.push(
                    classes = [
                      "class", ""
                    ]
                  )
                }

                classes[1] = classes[1].split(/\s+/)
                classes[1].push(attr.replace(/^\s*\./, ""))
                classes[1] = arrayUniq(classes[1]).
                join(" ").trim()
              }

              else if (attr.match(/^\s*#/)) {
                parent.attrs.push(["id",
                  attr.replace(/^\s*#/, "")
                ])
              }

              else {
                attr = attr.split(/\s*=\s*/)
                parent.attrs.push([attr[0],
                  attr.slice(1, attr.length).join("=")
                ])
              }
            })
          })
        }
      }
    })
  }
}

// --

export default function kramdownAttrs(markdown) {
  markdown.core.ruler.before("replacements",
    "kramdown_attrs", parseAttrs
  );
}
