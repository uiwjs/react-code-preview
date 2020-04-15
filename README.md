React Code Preview
---
<!--dividing-->

[![](https://img.shields.io/github/issues/uiwjs/react-code-preview.svg)](https://github.com/uiwjs/react-code-preview/issues)
[![](https://img.shields.io/github/forks/uiwjs/react-code-preview.svg)](https://github.com/uiwjs/react-code-preview/network)
[![](https://img.shields.io/github/stars/uiwjs/react-code-preview.svg)](https://github.com/uiwjs/react-code-preview/stargazers)
[![](https://img.shields.io/github/release/uiwjs/react-code-preview)](https://github.com/uiwjs/react-code-preview/releases)
[![](https://img.shields.io/npm/v/@uiw/react-code-preview.svg)](https://www.npmjs.com/package/@uiw/react-code-preview)
[![](https://jaywcjlove.github.io/sb/ico/gitee.svg)](https://uiw.gitee.io/react-code-preview/)

Code edit preview for React. Preview Demo: https://uiwjs.github.io/react-code-preview

There are often a lot of sample code in the documentation. We hope that you can run the sample code to view the rendering interface as you read the document.

## Install

```bash
npm install @uiw/react-code-preview --save
```

## Usage

```jsx
import React from 'react';
import { Button } from 'uiw';
import CodePreview from '@uiw/react-code-preview';

const code = `import { Button, Divider, Icon } from 'uiw';
ReactDOM.render(
  <div>
    <Button type="primary">主要按钮</Button>
    <Button type="success">成功按钮</Button>
  </div>,
  _mount_
);
`;

class Demo extends React.Component {
  render() {
    return (
      <CodePreview
        code={code}
        dependencies={{ Button }}
      />
    );
  }
}
```

- `_mount_` Special strings, the compilation will be replaced.

### Props

```typescript
export interface ICodePreviewProps extends SplitProps {
  prefixCls?: string;
  style?: React.CSSProperties;
  /**
   * To specify a CSS class, use the className attribute.
   */
  className?: string;
  /**
   * string|object. The mode to use. When not given, this will default to the first mode that was loaded.
   * It may be a string, which either simply names the mode or is a MIME type associated with the mode.
   * Alternatively, it may be an object containing configuration options for the mode,
   * with a name property that names the mode (for example `{name: "javascript", json: true}` ).
   */
  language?: string | { name: string, json: boolean };
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
  editProps?: IReactCodemirror;
  /**
   * Dependent component
   */
  dependencies?: { [key: string]: any };
  codePenOption?: ICodePenOption;
}
```

```typescript
interface ICodePenOption {
  title?: string;
  html?: string;
  js?: string;
  css?: string;
  editors?: string;
  css_external?: string;
  js_external?: string;
  js_pre_processor?: string;
}
```

## Development

The components are placed in the [`src`](./src) directory.

```bash
npm run watch # Listen compile .tsx files.
npm run build # compile .tsx files.

npm run doc
```

### License

Licensed under the MIT License.
