let fs = require('fs-extra')
let path = require('path')
let pretty = require('pretty')

let library = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'library.json'), 'utf-8')
)

let content = ''

content += `<div class="library-info">`
content += `<div class="library-name">${library.name}</div>`
content += `<div class="library-bio">${library.bio}</div>`
content += `</div>`

content += `<div class="lists">`
let lists = library.lists
for (let l = 0; l < lists.length; l++) {
  let list = lists[l]
  content += `<div class="list">`
  content += `<div><span class="list-name">${list.name}</span> <span class="book-number">${list.books.length}</span></div>`
  let books = list.books
  for (let b = 0; b < books.length; b++) {
    let book = books[b]
    content += `<div class="book"><span class="book-title"><a href="${book.link}">${book.title}</a></span> by <span class="book-author">${book.author}</span></div>`
  }
  content += `</div>`
}
content += '</div>'

let html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>${library.name}</title>
    <meta name="description" content="${library.bio}" />

    <meta property="og:title" content="${library.name}" /> 
    <meta property="og:description" content="${library.bio}" />
    <meta property="og:url" content="${library.url}" />

    <meta name="viewport" content="width=device-width" />
 
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    ${content}
    <div class="source-links">
      Built from <a href="/library.json">library.json</a> according to
      <a href="https://tomcritchlow.com/2020/04/15/library-json/">this proposed format</a>.
    </div>
    <div class="archive"><a href="https://www.goodreads.com/user/show/74775-grant-custer">Goodreads (legacy)</a></div>
    <div class="footer">
      <div>Grant Custer</div>
      <div class="footer-links">
        <a href="http://index.grantcuster.com">Index</a>
        <a href="http://feed.grantcuster.com">Feed</a>
        <a href="https://twitter.com/grantcuster">Twitter</a>
      </div>
    </div>
  </body>
</html>`

fs.writeFileSync('index.html', pretty(html))
