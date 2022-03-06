## React Code Preview

<!--dividing-->

[![Build & Deploy](https://github.com/uiwjs/react-code-preview/workflows/Build%20&%20Deploy/badge.svg)](https://github.com/uiwjs/react-code-preview/actions)
[![Release](https://img.shields.io/github/release/uiwjs/react-code-preview)](https://github.com/uiwjs/react-code-preview/releases)
[![npm version](https://img.shields.io/npm/v/@uiw/react-code-preview.svg)](https://www.npmjs.com/package/@uiw/react-code-preview)
[![Gitee](https://jaywcjlove.github.io/sb/ico/gitee.svg)](https://uiw.gitee.io/react-code-preview/)

Code edit preview for React. Preview Demo: https://uiwjs.github.io/react-code-preview

There are often a lot of sample code in the documentation. We hope that you can run the sample code to view the rendering interface as you read the document.

## Install

```bash
npm install @uiw/react-code-preview --save
```

## Usage

[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?logo=codesandbox)](https://codesandbox.io/embed/polished-surf-t6ro9?fontsize=14&hidenavigation=1&theme=dark)

```jsx
import Button from '@uiw/react-button';
import CodePreview from '@uiw/react-code-preview';

const code = `import Button from '@uiw/react-button';
ReactDOM.render(
  <div>
    <Button type="primary">主要按钮</Button>
    <Button type="success">成功按钮</Button>
  </div>,
  _mount_
);
`;

export default function App() {
  return <CodePreview code={code} dependencies={{ Button }} />;
}
```

- `_mount_` Special strings, the compilation will be replaced.

### Props

```typescript
interface CodePreviewProps extends SplitProps {
  prefixCls?: string;
  style?: React.CSSProperties;
  /**
   * To specify a CSS class, use the className attribute.
   */
  className?: string;
  /**
   * Whether to display the border.
   */
  bordered?: boolean;
  /**
   * `JSX` source code
   */
  code?: string;
  /**
   * Whether to display the code interface.
   */
  noCode?: boolean;
  /**
   * Is the background white or plaid?
   */
  bgWhite?: boolean;
  /**
   * Only show Edit
   */
  onlyEdit?: boolean;
  /**
   * Whether to display the preview interface.
   */
  noPreview?: boolean;
  /**
   * Preview area does not display scroll bars
   */
  noScroll?: boolean;
  /**
   * Modify ReactCodemirror props.
   */
  editProps?: ReactCodeMirrorProps;
  /**
   * Dependent component
   */
  dependencies?: Record<string, any>;
  codePenOption?: CodepenProps & {
    /**
     * Packages that do not require comments.
     * @example ['uiw']
     */
    includeModule?: string[];
  };
  codeSandboxOption?: CodeSandboxProps;
  /** @default 'Code' */
  btnText?: string;
  /** @default 'Hide Editor' */
  btnHideText?: string;
}
```

```typescript
type CodePenOption = {
  title?: string;
  html?: string;
  js?: string;
  css?: string;
  editors?: string;
  css_external?: string;
  js_external?: string;
  js_pre_processor?: string;
};
type CodepenProps = CodePenOption & React.FormHTMLAttributes<HTMLFormElement>;
```

```typescript
type CodeSandboxProps = React.FormHTMLAttributes<HTMLFormElement> & {
  /**
   * Whether we should redirect to the embed instead of the editor.
   */
  embed?: boolean;
  /**
   * The query that will be used in the redirect url. `embed` must be equal to `true`, `embed=true`.
   * [CodeSandbox Embed Options](https://codesandbox.io/docs/embedding#embed-options)
   * @example `view=preview&runonclick=1`
   */
  query?: string;
  /**
   * Instead of redirecting we will send a JSON reponse with `{"sandbox_id": sandboxId}`.
   */
  json?: boolean;
  /**
   * Parameters used to define how the sandbox should be created.
   */
  files?: Record<
    string,
    {
      content?: string | Record<string, any>;
      isBinary?: boolean;
    }
  >;
};
```

## Development

The components are placed in the [`src`](./src) directory.

```bash
npm run watch # Listen compile .tsx files.
npm run build # compile .tsx files.

npm run doc
```

### Related

- [@uiw/react-markdown-preview](https://github.com/uiwjs/react-markdown-preview): React component preview markdown text in web browser.
- [@uiw/react-codemirror](https://github.com/uiwjs/react-codemirror): CodeMirror component for React. @codemirror
- [@uiw/react-monacoeditor](https://github.com/jaywcjlove/react-monacoeditor): Monaco Editor component for React.
- [@uiw/react-markdown-editor](https://github.com/uiwjs/react-markdown-editor): A markdown editor with preview, implemented with React.js and TypeScript.
- [@uiw/react-md-editor](https://github.com/uiwjs/react-md-editor): A simple markdown editor with preview, implemented with React.js and TypeScript.

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/uiwjs/react-code-preview/graphs/contributors">
  <img src="https://uiwjs.github.io/react-code-preview/CONTRIBUTORS.svg" />
</a>

Made with [github-action-contributors](https://github.com/jaywcjlove/github-action-contributors).

### License

Licensed under the MIT License.
