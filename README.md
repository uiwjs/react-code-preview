React Component Example
---

## Install

```bash
npm install @uiw/react-code-preview --save
```

## Usage

```jsx
import React from 'react';
import { Button } from 'uiw';
import CodePreview from '@uiw/react-code-preview';

class Demo extends React.Component {
  render() {
    return (
      <CodePreview
        code="const a = 0;"
        dependencies={{ Button }}
      />
    );
  }
}
```

### Properties

```jsx
/**
 * To specify a CSS class, use the className attribute.
 */
className?: string;
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
 * Whether to display the preview interface.
 */
noPreview?: boolean;
/**
 * Dependent component
 */
dependencies?: { [key: string]: any };
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
