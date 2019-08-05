import React from 'react';
import { Switch, Divider, Button } from 'uiw';
import Markdown from './Markdown';
import GithubCorner from './GithubCorner';
import CodePreview from '../src';
import DocumentStr from '../README.md'; // @ts-ignore
import styles from './App.module.less';

const code = `import { Button, Divider, Icon } from 'uiw';

ReactDOM.render(
  <div>
    <Button type="primary">主要按钮</Button>
    <Button type="success">成功按钮</Button>
    <Button type="warning">警告按钮</Button>
    <Button type="danger">错误按钮</Button>
    <Button type="light">亮按钮</Button>
    <Button type="dark">暗按钮</Button>
  </div>,
  _mount_
);
`;

interface IAppState {
  bgWhite: boolean;
  noCode: boolean;
  noPreview: boolean;
}

export default class App extends React.PureComponent<{}, IAppState> {
  public state = {
    bgWhite: false,
    noCode: false,
    noPreview: false,
  }
  private handleChange(keyName: string,e: React.ChangeEvent<HTMLInputElement>) {
    const state = { ...this.state,[`${keyName}`]: e.target.checked }
    this.setState({ ...state });
  }
  render () {
    let DocumentStrSource = DocumentStr;
    if (DocumentStrSource) DocumentStrSource = DocumentStr.replace(/([\s\S]*)<!--dividing-->/, '');
    return (
      <div className={styles.warpper}>
        <GithubCorner url="https://uiwjs.github.io/react-code-preview" />
        <h1 className={styles.title}>React Code Preview</h1>
        <CodePreview
          code={code}
          dependencies={{ Button }}
          bgWhite={this.state.bgWhite}
          noCode={this.state.noCode}
          noPreview={this.state.noPreview}
        >
          {code}
        </CodePreview>
        <div>
          <Switch
            data-checked="格纹"
            data-unchecked="白色"
            checked={this.state.bgWhite}
            onChange={this.handleChange.bind(this, 'bgWhite')}
          >
            背景 `bgWhite`
          </Switch>
          <Divider type="vertical" />
          <Switch
            data-checked="显示"
            data-unchecked="隐藏"
            checked={this.state.noCode}
            onChange={this.handleChange.bind(this, 'noCode')}
          >
            是否显示代码 `noCode`
          </Switch>
          <Divider type="vertical" />
          <Switch
            data-checked="显示"
            data-unchecked="隐藏"
            checked={this.state.noPreview}
            onChange={this.handleChange.bind(this, 'noPreview')}
          >
            是否显示实例预览 `noPreview`
          </Switch>
        </div>
        <Markdown source={DocumentStrSource} />
      </div>
    )
  }
}