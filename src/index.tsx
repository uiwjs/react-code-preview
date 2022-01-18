import React, { useRef, useEffect, useImperativeHandle } from 'react';
import CodeMirror, { ReactCodeMirrorProps, ReactCodeMirrorRef, ViewUpdate } from '@uiw/react-codemirror';
import copyTextToClipboard from '@uiw/copy-to-clipboard';
import { javascript } from '@codemirror/lang-javascript';
import { CodeSandboxProps } from '@uiw/react-codesandbox';
import { CodepenProps } from '@uiw/react-codepen';
import Split, { SplitProps } from '@uiw/react-split';
import ThirdPartyButton from './ThirdPartyButton';
import * as icon from './icon';
import { ErrorMessage } from './ErrorMessage';
import { useCodePreview } from './useCodePreview';
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

export interface CodePreviewRef {
  editor?: React.RefObject<ReactCodeMirrorRef>;
  demo?: HTMLDivElement | null;
}

const CodePreview = React.forwardRef<CodePreviewRef, CodePreviewProps>((props, ref) => {
  const {
    style,
    prefixCls = 'w-code-preview',
    className,
    editProps = {},
    codePenOption,
    codeSandboxOption,
    code: _Code = '',
    dependencies = {},
    btnText = 'Code',
    btnHideText = 'Hide Editor',
    onlyEdit = false,
    bordered = true,
    noCode = false,
    noPreview = false,
    noScroll = false,
    bgWhite = false,
    ...otherProps
  } = props;
  const {
    playerId,
    setDemoDom,
    code,
    setCode,
    fullScreen,
    setFullScreen,
    errorMessage,
    width,
    setWidth,
    showEdit,
    setShowEdit,
    copied,
    setCopied,
  } = useCodePreview({ code: _Code, dependencies, ...props });
  const demoRef = useRef<HTMLDivElement>(null);
  const editor = useRef<ReactCodeMirrorRef>(null);
  useImperativeHandle(ref, () => ({ editor: editor, demo: demoRef.current }), [editor, demoRef]);
  const isOneItem = !noCode && !noPreview ? false : !noCode || !noPreview;
  const visiable = width === 1 ? false : [isOneItem ? 1 : 2];
  const cls = [
    className,
    prefixCls,
    noScroll ? `${prefixCls}-noScroll` : null,
    isOneItem ? `${prefixCls}-OneItem` : null,
    bordered ? `${prefixCls}-bordered` : null,
    fullScreen ? `${prefixCls}-fullScreen` : null,
  ]
    .filter(Boolean)
    .join(' ')
    .trim();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setCode(_Code), [_Code]);
  useEffect(() => {
    if (demoRef.current) {
      setDemoDom(demoRef.current);
    }
    window.addEventListener(
      'popstate',
      (e) => {
        document.body.style.overflow = 'inherit';
      },
      false,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const transitionend = () => setShowEdit(width !== 1);

  useEffect(() => {
    const dom = demoRef.current;
    if (dom) {
      dom.addEventListener('transitionend', transitionend);
    }
    return () => {
      if (dom) {
        dom.removeEventListener('transitionend', transitionend);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  const handleChange = (value: string, viewUpdate: ViewUpdate) => {
    setCode(value);
    if (editProps && editProps.onChange) {
      editProps.onChange(value, viewUpdate);
    }
  };
  const onSwitchSource = () => {
    setWidth(width === 1 ? '50%' : 1);
    setShowEdit(true);
  };
  const onCopyCode = () => {
    copyTextToClipboard(code || '', (isCopy) => setCopied(isCopy));
    setTimeout(() => setCopied(false), 2000);
  };
  const onFullScreen = () => {
    setFullScreen(!fullScreen);
    document.body.style.overflow = !fullScreen ? 'hidden' : 'inherit';
    if (!fullScreen && demoRef.current) {
      demoRef.current.style.maxWidth = 'inherit';
    }
  };
  return (
    <Split visiable={visiable} className={cls} style={{ flex: 1, ...style }} {...otherProps}>
      {!noPreview && !onlyEdit && (
        <div
          className={[
            `${prefixCls}-demo`,
            !bgWhite ? `${prefixCls}-demo-bgPlaid` : null,
            errorMessage ? `${prefixCls}-demo-error` : null,
          ]
            .filter(Boolean)
            .join(' ')
            .trim()}
          style={{
            flex: 1,
            ...(width === 1 ? { width: '100%' } : {}),
          }}
        >
          <ErrorMessage message={errorMessage} />
          <div
            className={[`${prefixCls}-demo-source`, errorMessage ? 'error' : null].filter(Boolean).join(' ').trim()}
            id={playerId.current}
          />
        </div>
      )}
      {(!noCode || onlyEdit) && (
        <div ref={demoRef} style={{ overflow: 'hidden', width: onlyEdit ? '100%' : width }}>
          {(showEdit || onlyEdit) && (
            <CodeMirror
              value={(code || '').replace(/\n$/, '')}
              ref={editor}
              extensions={[javascript({ jsx: true })]}
              {...editProps}
              style={{ height: '100%' }}
              height="100%"
              onChange={handleChange}
            />
          )}
        </div>
      )}
      {!isOneItem && !(noCode && noPreview) && !onlyEdit && (
        <div style={{ flex: 1, width: 29 }} className={`${prefixCls}-bar`}>
          <ThirdPartyButton prefixCls={prefixCls} codePenOption={codePenOption} codeSandboxOption={codeSandboxOption} />
          <div className={`${prefixCls}-bar-btn`} onClick={onSwitchSource}>
            {width === 1 ? btnText : btnHideText}
          </div>
          <div
            className={[`${prefixCls}-bar-iconbtns`, copied ? `${prefixCls}-bar-copied` : null]
              .filter(Boolean)
              .join(' ')
              .trim()}
            onClick={onCopyCode}
          >
            {copied ? icon.copyOk : icon.copy}
          </div>
          <div
            className={[`${prefixCls}-bar-iconbtns`, fullScreen ? `${prefixCls}-bar-copied` : null]
              .filter(Boolean)
              .join(' ')
              .trim()}
            onClick={onFullScreen}
          >
            {icon.full}
          </div>
        </div>
      )}
    </Split>
  );
});

CodePreview.displayName = 'CodePreview';

export default CodePreview;
