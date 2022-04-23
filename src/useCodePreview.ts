import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { babelTransform } from './transform';
import { CodePreviewProps } from './';
import ReactDOM from 'react-dom';

export const getReactDOMClient = () => {
  let _ReactDOM;
  try {
    // 使用 require 解决 react v17 ts 报错问题
    _ReactDOM = require('react-dom/client');
  } catch (err) {
    // console.warn(`如果使用的是react-dom小于v18的版本，可以忽略此警告：${err}`)
  }
  return _ReactDOM;
};

export function useCodePreview(props: CodePreviewProps) {
  const [demoDom, setDemoDom] = useState<HTMLDivElement>();
  const playerId = useRef(`${parseInt(String(Math.random() * 1e9), 10).toString(36)}`);
  const [fullScreen, setFullScreen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showEdit, setShowEdit] = useState(false);
  const [width, setWidth] = useState<number | string>(1);
  const [copied, setCopied] = useState(false);
  const [code, setCode] = useState(props.code || '');

  const ReactDOMClient = React.useMemo(() => {
    return window.ReactDOM ? window.ReactDOM : getReactDOMClient();
  }, []);

  /** 通过缓存的方式 解决 react v18 中 的报错   ***/
  // @ts-ignore
  const cachesRef = React.useRef(new Map<string, ReactDOMClient.Root>([]));
  const ReactDOMRender = (_ReactDOM: typeof ReactDOMClient) => {
    return {
      createRoot: (id: string) => {
        return {
          render: (render: React.ReactChild | Iterable<React.ReactNode>) => {
            const caches = cachesRef.current;
            let root = caches.get(id);
            // 存在则不需要重新创建直接进行render操作
            if (root) {
              root.render(render);
            } else {
              // @ts-ignore
              root = _ReactDOM.createRoot(document.getElementById(id)!);
              root.render(render);
              // 缓存，解决控制台报  ReactDOMClient.createRoot 问题
              caches.set(id, root);
            }
            cachesRef.current = caches;
          },
        };
      },
    };
  };
  /**  ------------------------   ***/

  const executeCode = (str: string) => {
    const {
      React: _React,
      ReactDOM: _ReactDOM,
      ReactDOMClient: _ReactDOMClient,
      ...otherDeps
    } = props.dependencies || {};
    let V18ReactDOM = _ReactDOMClient || ReactDOMClient || _ReactDOM || ReactDOM;
    // 判断是否是 react v18版本
    const isV18 = Reflect.has(V18ReactDOM, 'createRoot');
    const NewReactDOM = isV18 ? ReactDOMRender(V18ReactDOM) : V18ReactDOM;

    try {
      const deps = {
        React: _React || React,
        ...otherDeps,
        ReactDOM: NewReactDOM,
      } as any;
      // const args = ['context', 'React', 'ReactDOM', 'Component'];
      const args = [];
      // const argv = [this, React, ReactDOM, Component];
      const argv: any = [];
      for (const key in deps) {
        args.push(key);
        argv.push(deps[key]);
      }

      if (isV18) {
        // react < v18 中写法替换
        str = str.replace('ReactDOM.render', `ReactDOM.createRoot("${playerId.current}").render`);
        // react v18 中写法替换
        str = str.replace(`ReactDOM.createRoot(_mount_)`, `ReactDOM.createRoot("${playerId.current}")`);
        str = str.replace('_mount_', ``);
      } else {
        str = str.replace('_mount_', `document.getElementById('${playerId.current}')`);
      }

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => executeCode(code), [code, props.noPreview, demoDom]);
  return {
    playerId,
    demoDom,
    setDemoDom,
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
