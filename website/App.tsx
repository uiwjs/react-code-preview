import React from 'react';
import { Switch, Button } from 'uiw';
import GitHubCorners from '@uiw/react-github-corners';
import Markdown from '@uiw/react-md-editor/lib/esm/components/Markdown';
import '@uiw/react-md-editor/lib/esm/markdown.css';
import '@uiw/react-md-editor/lib/esm/markdowncolor.css';
import DocumentStr from '../README.md'; // @ts-ignore
import CodePreview from '../';
import { ICodePreviewProps } from '../';
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
  noScroll: boolean;
  noPreview: boolean;
  bordered: boolean;
  codePenShow: boolean;
  codePen: ICodePreviewProps['codePenOption'];
}

export default class App extends React.PureComponent<{}, IAppState> {
  public state = {
    bgWhite: false,
    noCode: false,
    noScroll: false,
    noPreview: false,
    bordered: true,
    codePenShow: true,
    codePen: {
      title: 'React Code Preview - demo',
      html: '<div id="root"></div>',
      js: code.replace('_mount_', 'document.getElementById("root")'),
      css_external: 'https://unpkg.com/uiw@3.2.6/dist/uiw.min.css',
      js_external: `https://unpkg.com/react@16.x/umd/react.development.js;https://unpkg.com/react-dom@16.x/umd/react-dom.development.js;https://unpkg.com/classnames@2.2.6/index.js;https://unpkg.com/uiw@3.2.6/dist/uiw.min.js;https://unpkg.com/@uiw/codepen-require-polyfill@1.0.0/index.js`,
    },
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
        <GitHubCorners fixed href="https://github.com/uiwjs/react-code-preview" target="__blank" />
        <h1 className={styles.title}>React Code Preview</h1>
        <CodePreview
          code={code}
          dependencies={{ Button }}
          bordered={this.state.bordered}
          noScroll={this.state.noScroll}
          bgWhite={this.state.bgWhite}
          noCode={this.state.noCode}
          noPreview={this.state.noPreview}
          codePenOption={this.state.codePenShow ? this.state.codePen : undefined}
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
            checked={this.state.bordered}
            onChange={this.handleChange.bind(this, 'bordered')}
          >
            是否显示边框 `bordered={this.state.bordered.toString()}`
          </Switch>
          <br />
          <Switch
            checked={this.state.codePenShow}
            onChange={this.handleChange.bind(this, 'codePenShow')}
          >
            是否显示边框 `codePenOption={this.state.codePenShow ? '{...}' : 'undefined'}`
          </Switch>
        </div>
        <Markdown style={{ paddingTop: 25 }} source={DocumentStrSource} />
      </div>
    )
  }
}