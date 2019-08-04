import React from 'react';
import { Switch, Divider } from "uiw";
import CodePreview from '../src';
import './App.less';

const code = `import { Button, Divider, Icon } from 'uiw';

ReactDOM.render(
  <div>
    <Button type="primary">主要按钮</Button>
  </div>,
  _mount_
);
`

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
  private handleChangeBg(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      bgWhite: e.target.checked,
    });
  }
  private handleShowCode(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      noCode: e.target.checked,
    });
  }
  private handleShowPreview(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      noPreview: e.target.checked,
    });
  }
  render () {
    return (
      <div className="warpper">
        <CodePreview
          code={code}
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
            onChange={this.handleChangeBg.bind(this)}
          >
            背景
          </Switch>
          <Divider type="vertical" />
          <Switch
            data-checked="显示"
            data-unchecked="隐藏"
            checked={this.state.noCode}
            onChange={this.handleShowCode.bind(this)}
          >
            是否显示代码
          </Switch>
          <Divider type="vertical" />
          <Switch
            data-checked="显示"
            data-unchecked="隐藏"
            checked={this.state.noPreview}
            onChange={this.handleShowPreview.bind(this)}
          >
            是否显示实例预览
          </Switch>
        </div>
      </div>
    )
  }
}