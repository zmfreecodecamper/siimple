//Markdown tokes
module.exports = {
    // Heading
    // ### This is a heading 1
    "heading": /^(#+)\s+(.*)/,
    // 
    // Blockquote: anly line starting with '> '
    // > Be or not to be
    "blockquote": /^>\s*/,
    // 
    // Divider: displays a separator ruler
    // ---
    // - - -
    // ***
    // * * *
    "divider": /^.*?(?:---|\*\*\*|-\s-\s-|\*\s\*\s\*)/, 
    // 
    // Tip needs two regex: 
    // - the first for the heading (with the tip type) and
    // - the last for the end of the tip content
    // ::: error This is an error!!
    // This is the content of the error message
    // :::
    "tipStart": /^:::/,
    "tipEnd": /^:::/,
    // 
    // Table needs the following regex
    // - row: capture an entire row of the table
    // - column: capture each column of the table
    // | Column 1 | Column 2 |
    // | Body 1.1 | Body 1.2 |
    // | Body 2.1 | Body 2.2 |
    "tableRow": /^\|((?:\s*[^\n|]+\s*\|?)+)\|\s*$/,
    "tableColumn": /\|\s*([^\n|]+)\s*/g,
    // 
    // Image: capture image src and alt (optionally)
    // ![Hello](./src/hello.png)
    "image": /^!\[([^\]]*?)\]\(([^)]*?)\)\s*/,
    // 
    // Link: capture link url and content
    // [My website](https://website.me)
    "link": /^\[(.*?)\]\(([^\t\n\s]*?)\)\s*/,
    // 
    // Inline html code block
    // <strong>Hello</strong>
    "html": /^</,
    // 
    // Code block
    // ```javascript
    // let a = 0;
    // ```
    "codeStart": /^```\s*(\w*)/,
    "codeEnd": /^```/,
    // 
    // Inline code block
    // `let a = 0;`
    "inlineCode": /^`([^`]*?)`/,
    // 
    // Strong text
    // **Hello world**
    "strong": /^(?:\*\*|__)(.*?)(?:\*\*|__)/,
    // 
    // Emphasis text
    // *Hello world*
    "emphasis": /^(?:\*|_)(.*?)(?:\*|_)/,
    //
    // Paragraph
    // This is a catch-all token
    "paragraph": /^(.*)/
};

