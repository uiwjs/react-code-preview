import React from 'react';
import GitHubCorners from '@uiw/react-github-corners';
import Markdown from '@uiw/react-markdown-preview';
import DocumentStr from '../README.md';
import styles from './App.module.less';
import Example from './Example';

export default function App() {
  // @ts-ignore
  const version = VERSION;
  let DocumentStrSource = DocumentStr;
  if (DocumentStrSource) DocumentStrSource = DocumentStr.replace(/([\s\S]*)<!--dividing-->/, '');
  return (
    <div className={styles.warpper}>
      <GitHubCorners fixed href="https://github.com/uiwjs/react-code-preview" target="__blank" />
      <h1 className={styles.title}>
        React Code Preview <sup>{version}</sup>
      </h1>
      <Example />
      <Markdown style={{ paddingTop: 25 }} source={DocumentStrSource} />
    </div>
  );
}
