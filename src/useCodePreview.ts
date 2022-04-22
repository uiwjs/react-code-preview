import React, { useEffect, useRef } from 'react';
import ReactDOMClient from 'react-dom/client';
import { useState } from 'react';
import { babelTransform } from './transform';
import { CodePreviewProps } from './';

export function useCodePreview(props: CodePreviewProps) {
  const [demoDom, setDemoDom] = useState<HTMLDivElement>();
  const playerId = useRef(`${parseInt(String(Math.random() * 1e9), 10).toString(36)}`);
  const [fullScreen, setFullScreen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showEdit, setShowEdit] = useState(false);
  const [width, setWidth] = useState<number | string>(1);
  const [copied, setCopied] = useState(false);
  const [code, setCode] = useState(props.code || '');

  /** 通过缓存的方式 临时解决 react v18 中 的报错   ***/
  const cachesRef = React.useRef(new Map<string, ReactDOMClient.Root>([]));
  const ReactDOMRender = {
    createRoot: (id: string) => {
      return {
        render: (render: React.ReactChild | Iterable<React.ReactNode>) => {
          const caches = cachesRef.current;
          let root = caches.get(id);
          // 存在则不需要重新创建直接进行render操作
          if (root) {
            root.render(render);
          } else {
            root = ReactDOMClient.createRoot(document.getElementById(id)!);
            root.render(render);
            // 缓存，临时解决控制台报  ReactDOMClient.createRoot 问题
            caches.set(id, root);
          }
          cachesRef.current = caches;
        },
      };
    },
  };
  /**  ------------------------   ***/

  const executeCode = (str: string) => {
    const { React: _React, ReactDOM, ReactDOMClient, ...otherDeps } = props.dependencies || {};
    try {
      const deps = {
        React: _React || React,
        ...otherDeps,
        ReactDOMClient: ReactDOMRender,
      } as any;
      // const args = ['context', 'React', 'ReactDOM', 'Component'];
      const args = [];
      // const argv = [this, React, ReactDOM, Component];
      const argv: any = [];
      for (const key in deps) {
        args.push(key);
        argv.push(deps[key]);
      }
      // react < v18 中写法替换
      str = str.replace('ReactDOM.render', `ReactDOMClient.createRoot("${playerId.current}").render`);
      // react v18 中写法替换
      str = str.replace(
        `ReactDOMClient.createRoot(_mount_).render`,
        `ReactDOMClient.createRoot("${playerId.current}").render`,
      );
      str = str.replace('_mount_', ``);

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
