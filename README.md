[![GitHub repository](https://img.shields.io/badge/GitHub-repository-181717?logo=github)](https://github.com/sovereignbase/dom-utils)
[![TypeDoc](https://img.shields.io/badge/TypeDoc-API-3178c6?logo=typescript&logoColor=white)](https://sovereignbase.dev/dom-utils/)
[![JSR](https://jsr.io/badges/@sovereignbase/dom-utils)](https://jsr.io/@sovereignbase/dom-utils)
[![npm](https://img.shields.io/npm/v/@sovereignbase/dom-utils?logo=npm)](https://www.npmjs.com/package/@sovereignbase/dom-utils)

# Import elements by tag name

Use our [cssText IntelliSense extension for VS Code](https://marketplace.visualstudio.com/items?itemName=sovereignbase.vscode-csstext-intellisense) to get CSS syntax highlighting and completions inside `style.cssText` template literals.

![TypeScript importing elements by tag name and styling them with cssText](https://sovereignbase.dev/dom-utils/images/import-elements-by-tag-name.png)

## Behaves just as you would expect

![A native DOM element created and styled with dom-utils](https://sovereignbase.dev/dom-utils/images/dom-result.png)

Real DOM elements, native browser APIs, and less ceremony for vanilla JavaScript and TypeScript builders.

## readableUserAgent

Returns a readable browser and device description, such as `Chrome · Windows · desktop`. Uses the user agent and available Client Hints, omitting missing values.

## Compatibility

- Runtimes: browsers with a DOM; import after the document body exists.
- Module format: ESM and CommonJS.
- Types: bundled `.d.ts`.

## Tests

Suite: Playwright — user-agent descriptions, Client Hints, element factories, document roots, styles, events, forms, tables, and lists.

Matrix: Chromium / Firefox / WebKit + mobile Chrome and Safari emulation.

## License

Apache-2.0
