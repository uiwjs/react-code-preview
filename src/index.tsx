import React from 'react';
import classnames from 'classnames';
import { Split } from 'uiw';
import icon from './icon';
import CodeMirror from '@uiw/react-codemirror';
import './monokai.css';
import './index.less';

export interface ICodePreviewProps {
  prefixCls?: string;
  className?: string;
  code?: string;
  noCode?: boolean;
  /**
   * 
   */
  bgWhite?: boolean;
  noPreview?: boolean;
}

export interface ICodePreviewState {
  fullScreen: boolean;
  width: number;
}

// bgWhite,noCode,noPreview,noScroll,codePen

export default class CodePreview extends React.PureComponent<ICodePreviewProps, ICodePreviewState> {
  // demoDom = React.createRef();
  public demoDom = React.createRef<HTMLDivElement>();
  public state: ICodePreviewState = {
    fullScreen: false,
    width: 1
  }
  public static defaultProps: ICodePreviewProps = {
    prefixCls: 'w-code-preview',
    code: '',
    noCode: false,
    bgWhite: false,
    noPreview: false,
  }
  constructor(props: ICodePreviewProps) {
    super(props);
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
    
  }
  public render() {
    const { prefixCls, className, code, noCode, noPreview, bgWhite } = this.props;
    const isOneItem = (!noCode && !noPreview) ? false : (!noCode || !noPreview);
    console.log('~~', this.props.bgWhite)
    return (
      <Split
        visiable={[isOneItem ? 1 : 2]}
        className={classnames(className, prefixCls, {
          [`${prefixCls}-OneItem`]: isOneItem,
          [`${prefixCls}-fullScreen`]: this.state.fullScreen,
        })}
        style={{ flex: 1 }}
      >
        {!noPreview && (
          <div ref={this.demoDom} className={`${prefixCls}-demo`} style={{ width: isOneItem ? '100%' : '50%', minWidth: 160 }}>
            {!bgWhite && (
              <div className={`${prefixCls}-bgPlaid`}> {icon.bgPlaid} </div>
            )}
          </div>
        )}
        {!noCode && (
          <div style={{ overflow: 'hidden', width: `calc(${isOneItem ? '100%' : '50% - 29px'})` }}>
            <CodeMirror
              value={code}
              options={{
                theme: 'monokai',
                mode: 'jsx',
              }}
            />
          </div>
        )}
        {!isOneItem && (
          <div style={{ flex: 1, width: 29 }} className={`${prefixCls}-bar`}>
            <div className={`${prefixCls}-bar-btn`} onClick={this.onSwitchSource.bind(this)}>{this.state.width === 1 ? '源码' : '隐藏编辑器'}</div>
            <div className={`${prefixCls}-bar-fullScreen`} onClick={this.onFullScreen.bind(this)}>
              {icon.full}
            </div>
          </div>
        )}
      </Split>
    )
  }
}