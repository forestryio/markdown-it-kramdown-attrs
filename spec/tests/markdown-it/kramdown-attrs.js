import MarkdownIt from "markdown-it"
import KramdownAttrs from "../../../src/markdown-it/kramdown-attrs"
import assert from "assert"

// --

const renderer = new MarkdownIt()
renderer.use(
  KramdownAttrs
)

// --

describe("KramdownAttrs", () => {
  it("Text{: .class}", () => {
    let result = renderer.render("Text{: .class}").trim()
    assert.equal(result,
      '<p class="class">Text</p>'
    )
  })

  //

  it("Text{:.class}", () => {
    let result = renderer.render("Text{:.class}").trim()
    assert.equal(result,
      '<p class="class">Text</p>'
    )
  })

  //

  it("Text {: .class}", () => {
    let result = renderer.render("Text {: .class}").trim()
    assert.equal(result,
      '<p class="class">Text</p>'
    )
  })

  //

  it("Text {:.class}", () => {
    let result = renderer.render("Text {:.class}").trim()
    assert.equal(result,
      '<p class="class">Text</p>'
    )
  })

  //

  it("Text{: #id}", () => {
    let result = renderer.render("Text{: #id}").trim()
    assert.equal(result,
      '<p id="id">Text</p>'
    )
  })

  //

  it("Text{:#id}", () => {
    let result = renderer.render("Text{:#id}").trim()
    assert.equal(result,
      '<p id="id">Text</p>'
    )
  })

  //

  it("Text {: #id}", () => {
    let result = renderer.render("Text {: #id}").trim()
    assert.equal(result,
      '<p id="id">Text</p>'
    )
  })

  //

  it("Text {:#id}", () => {
    let result = renderer.render("Text {:#id}").trim()
    assert.equal(result,
      '<p id="id">Text</p>'
    )
  })

  //

  it("Text{: attr=val}", () => {
    let result = renderer.render("Text{: attr=val}").trim()
    assert.equal(result,
      '<p attr="val">Text</p>'
    )
  })

  //

  it("Text{:attr=val}", () => {
    let result = renderer.render("Text{:attr=val}").trim()
    assert.equal(result,
      '<p attr="val">Text</p>'
    )
  })

  //

  it("Text {: attr=val}", () => {
    let result = renderer.render("Text {: attr=val}").trim()
    assert.equal(result,
      '<p attr="val">Text</p>'
    )
  })

  //

  it("Text {:attr=val}", () => {
    let result = renderer.render("Text {:attr=val}").trim()
    assert.equal(result,
      '<p attr="val">Text</p>'
    )
  })

  //

  it("Text {:#id .class attr=val}", () => {
    let result = renderer.render("Text {:#id .class attr=val}").trim()
    assert.equal(result,
      '<p id="id" class="class" attr="val">Text</p>'
    )
  })

  //

  it("Text\\n{:#id .class attr=val}", () => {
    let result = renderer.render("Text\n{:#id .class attr=val}").trim()
    assert.equal(result,
      '<p id="id" class="class" attr="val">Text</p>'
    )
  })

  //

  it("Text\\n{:#id}\\n{:.class}\\n{:attr=val}", () => {
    let result = renderer.render("Text\n{:#id}\n{:.class}\n{:attr=val}").trim()
    assert.equal(result,
      '<p id="id" class="class" attr="val">Text</p>'
    )
  })
})
