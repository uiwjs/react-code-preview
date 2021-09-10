import React from 'react';
import ReactDOM from 'react-dom';
import CodeMirror, { ReactCodeMirrorProps, ReactCodeMirrorRef, ViewUpdate } from '@uiw/react-codemirror';
import copyTextToClipboard from '@uiw/copy-to-clipboard';
import { javascript } from '@codemirror/lang-javascript';
import { CodeSandboxProps } from '@uiw/react-codesandbox';
import { CodepenProps } from '@uiw/react-codepen';
import Split, { SplitProps } from '@uiw/react-split';
import ThirdPartyButton from './ThirdPartyButton';
import * as icon from './icon';
import { BabelTransform } from './transform';
import { ErrorMessage } from './ErrorMessage';
import './monokai.css';
import './index.less';

export interface CodePreviewProps extends SplitProps {
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
  editProps?: ReactCodeMirrorProps;
  /**
   * Dependent component
   */
  dependencies?: Record<string, any>;
  codePenOption?: CodepenProps & {
    /**
     * Packages that do not require comments.
     * @example ['uiw']
     */
    includeModule?: string[];
  };
  codeSandboxOption?: CodeSandboxProps;
  /** @default 'Code' */
  btnText?: string;
  /** @default 'Hide Editor' */
  btnHideText?: string;
}

export interface CodePreviewState {
  errorMessage: string;
  fullScreen: boolean;
  width: number | string;
  copied: boolean;
  showEdit: boolean;
}

export default class CodePreview extends React.PureComponent<CodePreviewProps, CodePreviewState> {
  public demoDom = React.createRef<HTMLDivElement>();
  public editor = React.createRef<ReactCodeMirrorRef>();
  public initHeight: number = 3;
  public playerId: string = `${parseInt(String(Math.random() * 1e9), 10).toString(36)}`;
  public static defaultProps: CodePreviewProps = {
    prefixCls: 'w-code-preview',
    code: '',
    btnText: 'Code',
    btnHideText: 'Hide Editor',
    editProps: {},
    dependencies: {},
    noCode: false,
    bgWhite: false,
    onlyEdit: false,
    noPreview: false,
    bordered: true,
  }
  constructor(props: CodePreviewProps) {
    super(props);
    this.state = {
      errorMessage: '',
      fullScreen: false,
      copied: false,
      showEdit: false,
      width: 1,
    }
  }
  componentDidMount() {
    if (!this.props.noPreview) {
      this.executeCode(this.props.code!);
    }
    window.addEventListener("popstate", (e) => { 
      document.body.style.overflow = 'inherit';
    }, false);
  }
  componentDidUpdate(prevProps: CodePreviewProps) {
    if (prevProps.noPreview !== this.props.noPreview) {
      this.executeCode(prevProps.code!);
    }
  }
  async executeCode(codeStr: string) {
    const { dependencies = {} } = this.props;
    const { React: _React, ReactDOM: _ReactDOM, ...otherDeps } = dependencies;
    try {
      const deps = {
        context: this,
        React: _React || React,
        ReactDOM: _ReactDOM || ReactDOM,
        ...otherDeps,
      } as any;
      // const args = ['context', 'React', 'ReactDOM', 'Component'];
      const args = [];
      // const argv = [this, React, ReactDOM, Component];
      const argv: any = [];
      for (const key in deps) {
        args.push(key);
        argv.push(deps[key]);
      }
      codeStr = codeStr.replace('_mount_', `document.getElementById('${this.playerId}')`);
      const input = `${codeStr}`;
      const { code } = BabelTransform(input);
      args.push(code || '');
      // console.log('code:', argv)
      // eslint-disable-next-line no-new-func
      new Function(...args).apply(null, argv);
      this.setState({ errorMessage: '' });
    } catch (err: any) {
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
  initOldHeight() {
    const demo = this.demoDom.current;
    if (this.initHeight === 3 && demo) {
      this.initHeight = demo.clientHeight;
    }
  }
  handleChange(value: string, viewUpdate: ViewUpdate) {
    const { editProps } = this.props;
    this.executeCode(value);
    if (editProps && editProps.onChange) {
      editProps.onChange(value, viewUpdate);
    }
  }
  /**
   * onSwitchSource
   */
  public onSwitchSource() {
    const { width } = this.state;
    this.initOldHeight();
    this.setState({
      width: width === 1 ? '50%' : 1,
      showEdit: true,
    });
  }
  public render() {
    const { style, prefixCls, className, editProps, codePenOption, codeSandboxOption, code, dependencies, btnText, btnHideText, onlyEdit, bordered, noCode, noPreview, noScroll, bgWhite, ...otherProps } = this.props;
    const isOneItem = (!noCode && !noPreview) ? false : (!noCode || !noPreview);
    let visiable = this.state.width === 1 ? false : [isOneItem ? 1 : 2];
    return (
      <Split
        visiable={visiable}
        className={[
          className, prefixCls,
          noScroll ? `${prefixCls}-noScroll` : null,
          isOneItem ? `${prefixCls}-OneItem` : null,
          bordered ? `${prefixCls}-bordered` : null,
          this.state.fullScreen ? `${prefixCls}-fullScreen` : null,
          ].filter(Boolean).join(' ').trim()}
        style={{ flex: 1, ...style }}
        {...otherProps}
      >
        {!noPreview && !onlyEdit && (
          <div
            ref={this.demoDom}
            className={[
              `${prefixCls}-demo`,
              !bgWhite ? `${prefixCls}-demo-bgPlaid` : null,
              this.state.errorMessage ? `${prefixCls}-demo-error` : null,
            ].filter(Boolean).join(' ').trim()}
            style={{
              flex: 1,
              ...(this.state.width === 1 ? { width: '100%'} : {})
            }}
          >
            <ErrorMessage message={this.state.errorMessage} />
            <div className={[`${prefixCls}-demo-source`, this.state.errorMessage ? 'error' : null].filter(Boolean).join(' ').trim()} id={this.playerId} />
          </div>
        )}
        {(!noCode || onlyEdit) && (
          <div style={{ overflow: 'hidden', width: onlyEdit ? '100%' : this.state.width }}>
            {(this.state.showEdit || onlyEdit) && (
              <CodeMirror
                value={(this.props.code || '').replace(/\n$/, '')}
                ref={this.editor}
                extensions={[javascript({ jsx: true })]}
                {...editProps}
                style={{ height: '100%' }}
                height="100%"
                onChange={this.handleChange.bind(this)}
              />
            )}
          </div>
        )}
        {!isOneItem && !(noCode && noPreview) && !onlyEdit && (
          <div style={{ flex: 1, width: 29 }} className={`${prefixCls}-bar`}>
            <ThirdPartyButton
              prefixCls={prefixCls}
              codePenOption={codePenOption}
              codeSandboxOption={codeSandboxOption}
            />
            <div className={`${prefixCls}-bar-btn`} onClick={this.onSwitchSource.bind(this)}>{this.state.width === 1 ? btnText : btnHideText}</div>
            <div
              className={[`${prefixCls}-bar-iconbtns`, this.state.copied ? `${prefixCls}-bar-copied` : null].filter(Boolean).join(' ').trim()}
              onClick={this.onCopyCode.bind(this)}
            >
              {icon.copy}
            </div>
            <div
              className={[`${prefixCls}-bar-iconbtns`, this.state.fullScreen ? `${prefixCls}-bar-copied` : null].filter(Boolean).join(' ').trim()}
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