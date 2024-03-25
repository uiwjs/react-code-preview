import GitHubCorners from '@uiw/react-github-corners';
import Markdown from '@uiw/react-markdown-preview';
import '@wcj/dark-mode';
import DocumentStr from '../README.md';
import styles from './App.module.less';
import Example from './Example';
import pkgJson from '../package.json';

export default function App() {
  const version = pkgJson.version;
  let DocumentStrSource = DocumentStr;
  if (DocumentStrSource) DocumentStrSource = DocumentStr.replace(/([\s\S]*)<!--dividing-->/, '');
  return (
    <div className={styles.warpper}>
      <dark-mode light="Light" dark="Dark" style={{ position: 'fixed', left: 10, top: 5 }}></dark-mode>
      <GitHubCorners fixed href="https://github.com/uiwjs/react-code-preview" target="__blank" />
      <h1 className={styles.title}>
        React Code Preview <sup>{version}</sup>
      </h1>
      <Example />
      <Markdown style={{ paddingTop: 25 }} source={DocumentStrSource} />
    </div>
  );
}
