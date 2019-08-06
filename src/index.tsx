import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import CodeMirror from '@uiw/react-codemirror';
import copyTextToClipboard from '@uiw/copy-to-clipboard';
import { Split } from 'uiw';
import { ISplitProps } from 'uiw/lib/esm/split';
import icon from './icon';
import { BabelTransform } from './transform';
import './monokai.css';
import './index.less';

export interface ICodePreviewProps extends ISplitProps {
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
   * Whether to display the preview interface.
   */
  noPreview?: boolean;
  /**
   * Dependent component
   */
  dependencies?: { [key: string]: any };
}

export interface ICodePreviewState {
  errorMessage: string;
  fullScreen: boolean;
  width: number | string;
  copied: boolean;
  showEdit: boolean;
}

export default class CodePreview extends React.PureComponent<ICodePreviewProps, ICodePreviewState> {
  public demoDom = React.createRef<HTMLDivElement>();
  public playerId: string = `${parseInt(String(Math.random() * 1e9), 10).toString(36)}`;
  public static defaultProps: ICodePreviewProps = {
    prefixCls: 'w-code-preview',
    code: '',
    noCode: false,
    bgWhite: false,
    noPreview: false,
    bordered: true,
  }
  public state: ICodePreviewState = {
    errorMessage: '',
    fullScreen: false,
    copied: false,
    showEdit: false,
    width: 1,
  }
  constructor(props: ICodePreviewProps) {
    super(props);
  }
  componentDidMount() {
    if (!this.props.noPreview) {
      this.executeCode(this.props.code!);
    }
  }
  componentWillReceiveProps(nextProps: ICodePreviewProps) {
    if (nextProps.noPreview !== this.props.noPreview) {
      this.executeCode(this.props.code!);
    }
  }
  async executeCode(codeStr: string) {
    try {
      const args = ['context', 'React', 'ReactDOM', 'Component'];
      const argv = [this, React, ReactDOM, Component];
      const Elm = this.props.dependencies;
      for (const key in Elm) {
        args.push(key);
        argv.push(Elm[key]);
      }
      codeStr = codeStr.replace('_mount_', `document.getElementById('${this.playerId}')`);
      const input = `${codeStr}`;
      const { code } = await BabelTransform(input);
      args.push(code);
      new Function(...args).apply(null, argv);
      this.setState({ errorMessage: '' });
      
    } catch (err) {
      let message = '';
      if (err && err.message) {
        message = err.message;
      } else {
        message = JSON.stringify(err);
      }
      this.setState({ errorMessage: message });
    }
  }
  /**
   * onCopyCode
   */
  public onCopyCode() {
    const { code } = this.props;
    copyTextToClipboard(code || '', (isCopy) => {
      this.setState({ copied: isCopy });
    });
    setTimeout(() => {
      this.setState({ copied: false });
    }, 2000);
  }
  /**
   * onFullScreen
   */
  public onFullScreen() {
    const { fullScreen } = this.state;
    this.setState({ fullScreen: !fullScreen }, () => {
      document.body.style.overflow = !fullScreen ? 'hidden' : 'inherit';
      if (!fullScreen && this.demoDom.current) {
        this.demoDom.current.style.maxWidth = 'inherit';
      }
    });
  }
  /**
   * onSwitchSource
   */
  public onSwitchSource() {
    const { width } = this.state;
    this.setState({
      width: width === 1 ? '50%' : 1,
      showEdit: true,
    });
  }
  public render() {
    const { style, prefixCls, className, code, dependencies, bordered, noCode, noPreview, bgWhite, ...otherProps } = this.props;
    const isOneItem = (!noCode && !noPreview) ? false : (!noCode || !noPreview);
    let visiable = this.state.width === 1 ? false : [isOneItem ? 1 : 2];
    return (
      <Split
        visiable={visiable}
        className={classnames(className, prefixCls, {
          [`${prefixCls}-OneItem`]: isOneItem,
          [`${prefixCls}-bordered`]: bordered,
          [`${prefixCls}-fullScreen`]: this.state.fullScreen,
        })}
        style={{ flex: 1, ...style }}
        {...otherProps}
      >
        {!noPreview && (
          <div
            ref={this.demoDom}
            className={classnames(`${prefixCls}-demo`, {
              [`${prefixCls}-demo-bgPlaid`]: !bgWhite,
              [`${prefixCls}-demo-error`]: this.state.errorMessage,
            })}
            style={{
              flex: 1,
              ...(this.state.width === 1 ? { width: '100%'} : {})
            }}
          >
            {this.state.errorMessage && (
              <pre>
                <code>{this.state.errorMessage}</code>
              </pre>
            )}
            <div className={classnames(`${prefixCls}-demo-source`, { ['error']: this.state.errorMessage })} id={this.playerId} />
          </div>
        )}
        {!noCode && (
          <div style={{ overflow: 'hidden', width: this.state.width, }}>
            {this.state.showEdit && (
              <CodeMirror
                value={code}
                onChange={(editor) => {
                  this.executeCode(editor.getValue());
                }}
                options={{
                  theme: 'monokai',
                  mode: 'jsx',
                }}
              />
            )}
          </div>
        )}
        {!isOneItem && !(noCode && noPreview) && (
          <div style={{ flex: 1, width: 29 }} className={`${prefixCls}-bar`}>
            <div className={`${prefixCls}-bar-btn`} onClick={this.onSwitchSource.bind(this)}>{this.state.width === 1 ? '源码' : '隐藏编辑器'}</div>
            <div
              className={classnames(`${prefixCls}-bar-iconbtns`, {
                [`${prefixCls}-bar-copied`]: this.state.copied,
              })}
              onClick={this.onCopyCode.bind(this)}
            >
              {icon.copy}
            </div>
            <div
              className={classnames(`${prefixCls}-bar-iconbtns`, {
                [`${prefixCls}-bar-copied`]: this.state.fullScreen,
              })}
              onClick={this.onFullScreen.bind(this)}
            >
              {icon.full}
            </div>
          </div>
        )}
      </Split>
    )
  }
}