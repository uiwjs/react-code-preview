import React from 'react';
import { Switch, Divider, Button } from 'uiw';
import Markdown from './Markdown';
import GithubCorner from './GithubCorner';
import DocumentStr from '../README.md'; // @ts-ignore
import CodePreview from '../src';
import styles from './App.module.less';

const code = `import { Button, Divider, Icon } from 'uiw';

ReactDOM.render(
  <div>
    <Button type="primary">主要按钮</Button>
    <Button type="dark">暗按钮</Button><br /><br /><br /><br /><br /><br />
    <Button type="dark">暗按钮</Button>
  </div>,
  _mount_
);
`;

interface IAppState {
  bgWhite: boolean;
  noCode: boolean;
  noScroll: boolean;
  noPreview: boolean;
  bordered: boolean;
}

export default class App extends React.PureComponent<{}, IAppState> {
  public state = {
    bgWhite: false,
    noCode: false,
    noScroll: false,
    noPreview: false,
    bordered: true,
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
          bordered={this.state.bordered}
          noScroll={this.state.noScroll}
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
            背景 `bgWhite={this.state.bgWhite.toString()}`
          </Switch>
          <br />
          <Switch
            data-checked="显示"
            data-unchecked="隐藏"
            checked={this.state.noCode}
            onChange={this.handleChange.bind(this, 'noCode')}
          >
            是否显示代码 `noCode={this.state.noCode.toString()}`
          </Switch>
          <br />
          <Switch
            data-checked="显示"
            data-unchecked="隐藏"
            checked={this.state.noPreview}
            onChange={this.handleChange.bind(this, 'noPreview')}
          >
            是否显示实例预览 `noPreview={this.state.noPreview.toString()}`
          </Switch>
          <br />
          <Switch
            data-checked="超出滚动"
            data-unchecked="高度自适应"
            checked={this.state.noScroll}
            onChange={this.handleChange.bind(this, 'noScroll')}
          >
            是否显示滚动条 `noScroll={this.state.noScroll.toString()}`
          </Switch>
          <br />
          <Switch
            data-checked="显示"
            data-unchecked="隐藏"
            checked={this.state.bordered}
            onChange={this.handleChange.bind(this, 'bordered')}
          >
            是否显示边框 `bordered={this.state.bordered.toString()}`
          </Switch>
        </div>
        <Markdown source={DocumentStrSource} />
      </div>
    )
  }
}