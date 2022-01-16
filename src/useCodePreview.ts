import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import { babelTransform } from './transform';
import { CodePreviewProps } from './';

export function useCodePreview(props: CodePreviewProps) {
  const [initHeight, setInitHeight] = useState<number>();
  const [demoDom, setDemoDom] = useState<HTMLDivElement>();
  const playerId = useRef(`${parseInt(String(Math.random() * 1e9), 10).toString(36)}`);
  const [fullScreen, setFullScreen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showEdit, setShowEdit] = useState(false);
  const [width, setWidth] = useState<number | string>(1);
  const [copied, setCopied] = useState(false);
  const [code, setCode] = useState(props.code || '');

  const executeCode = (str: string) => {
    const { React: _React, ReactDOM: _ReactDOM, ...otherDeps } = props.dependencies || {};
    try {
      const deps = {
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
      str = str.replace('_mount_', `document.getElementById('${playerId.current}')`);
      const input = `${str}`;
      const { code } = babelTransform(input);
      args.push(code || '');
      // console.log('code:', argv)
      // eslint-disable-next-line no-new-func
      new Function(...args).apply(null, argv);
      setErrorMessage('');
    } catch (err: any) {
      let message = '';
      if (err && err.message) {
        message = err.message;
      } else {
        message = JSON.stringify(err);
      }
      setErrorMessage(message);
    }
  };
  useEffect(() => {
    if (demoDom && !initHeight) {
      setInitHeight(demoDom.clientHeight);
    }
  }, [demoDom, initHeight]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => executeCode(code), [code]);
  return {
    playerId,
    demoDom,
    setDemoDom,
    initHeight,
    setInitHeight,
    fullScreen,
    setFullScreen,
    errorMessage,
    setErrorMessage,
    width,
    setWidth,
    showEdit,
    setShowEdit,
    copied,
    setCopied,
    code,
    setCode,
    executeCode,
  };
}
