# Markdown-it Kramdown Attributes

Add a little bit of Kramdown love to your Markdown-it.

## Usage

```js
import KramdownAttrs from "markdown-it-kramdown-attrs"
import MarkdownIt from "markdown-it"

// --

renderer = new MarkdownIt()
renderer.use(
  KramdownAttrs
)
```

## Examples
### Inline Attributes with Parent attributes

```md
# ![Text](image.jpg){:.class1}
{:.class2}
```

```html
<h1 class="class2">
  <img src="image.jpg" alt="Text" class="class1">
</h1>
```

### Elements with Attributes

```md
Text {.class1}
```

```html
<p class="class1">
  Text
</p>
```

### Mixed `{:}` and `{:}` after new lines.

```md
Text {.class1}
{.class2}
{.class3}
```

```html
<p class="class1 class2 class3">
  Text
</p>
```

---

```md
# ![Text](image.jpg){:.class1}
{:.class2}
{:.class3}
{:.class4}
```

```html
<h1 class="class2 class3 class4">
  <img src="img.jpg" alt="Text" class="class1">
</h1>
```

### Multiple in `{:}`

```md
# ![Text](image.jpg){:.class1 .class2}
{:.class3 .class4}
```

```html
<h1 class="class3 class4">
  <img src="img.jpg" alt="Text" class="class1 class2">
</h1>
```
