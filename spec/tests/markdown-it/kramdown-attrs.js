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
  it("# Text{: .class}", () => {
    let result = renderer.render("# Text{: .class}").trim()
    assert.equal(result,
      '<h1 class="class">Text</h1>'
    )
  })

  it("# ![Text](image.jpg){:.class1}\\n{:.class2}", () => {
    let result = renderer.render("# ![Text](image.jpg){:.class1}\n{:.class2}").trim()
    assert.equal(result,
      '<h1 class="class2"><img src="image.jpg" alt="Text" class="class1"></h1>'
    )
  })

  it("# ![Text](image.jpg){:.class1 .class2}\\n{:.class3 .class4}", () => {
    let result = renderer.render("# ![Text](image.jpg){:.class1 .class2}\n{:.class3 .class4}").trim()
    assert.equal(result,
      '<h1 class="class3 class4"><img src="image.jpg" alt="Text" class="class1 class2"></h1>'
    )
  })

  it("# ![Text](image.jpg){:.class1}\\n{:.class2}\\n{:.class3}\\n{:.class4}", () => {
    let result = renderer.render("# ![Text](image.jpg){:.class1}\n{:.class2}\n{:.class3}\n{:.class4}").trim()
    assert.equal(result,
      '<h1 class="class2 class3 class4"><img src="image.jpg" alt="Text" class="class1"></h1>'
    )
  })

  it("Text{: .class1}\\n{: .class2}", () => {
    let result = renderer.render("Text{: .class1}\n{: .class2}").trim()
    assert.equal(result,
      '<p class="class1 class2">Text</p>'
    )
  })

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
