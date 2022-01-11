import React from 'react';
import GitHubCorners from '@uiw/react-github-corners';
import Markdown from '@uiw/react-markdown-preview';
import DocumentStr from '../README.md';
import styles from './App.module.less';
import Example from './Example';

export default class App extends React.PureComponent<{}, {}> {
  render() {
    let DocumentStrSource = DocumentStr;
    if (DocumentStrSource) DocumentStrSource = DocumentStr.replace(/([\s\S]*)<!--dividing-->/, '');
    return (
      <div className={styles.warpper}>
        <GitHubCorners fixed href="https://github.com/uiwjs/react-code-preview" target="__blank" />
        <h1 className={styles.title}>React Code Preview</h1>
        <Example />
        <Markdown style={{ paddingTop: 25 }} source={DocumentStrSource} />
      </div>
    );
  }
}
