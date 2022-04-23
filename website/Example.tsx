import { Fragment, useState, useEffect } from 'react';
import CodePreview from '../';
import { Switch } from 'uiw';
import * as UIW from 'uiw';

const defaultCode = `
import { Button, Divider, Icon } from 'uiw';
import ReactDOMClient from 'react-dom/client';

ReactDOMClient.createRoot(_mount_).render(
  <div>
    <Button type="primary">主要按钮</Button>
    <Button type="success">成功按钮</Button>
    <Button type="warning">警告按钮</Button>
    <Button type="danger">错误按钮</Button>
    <Button type="light">亮按钮</Button>
    <Button type="dark">暗按钮</Button>
  </div>,
);`;

const Example = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [code] = useState(defaultCode);
  const [state, setState] = useState({
    bgWhite: false,
    noCode: false,
    noScroll: false,
    noPreview: false,
    bordered: true,
    codeSandbox: {
      files: {
        'sandbox.config.json': {
          content: `{
            "template": "node",
            "container": {
              "startScript": "start",
              "node": "14"
            }
          }`,
        },
        'public/index.html': {
          content: `<div id="root"></div>`,
        },
        'src/index.js': {
          content: code.replace('_mount_', 'document.getElementById("root")'),
        },
        'src/index.less': {
          content: '',
        },
        '.kktrc.js': {
          content: `import webpack from "webpack";\nimport lessModules from "@kkt/less-modules";\nexport default (conf, env, options) => {\nconf = lessModules(conf, env, options);\nreturn conf;\n};`,
        },
        'package.json': {
          content: {
            dependencies: {
              react: 'latest',
              'react-dom': 'latest',
              uiw: 'latest',
            },
            devDependencies: {
              '@kkt/less-modules': '6.0.11',
              kkt: '6.0.11',
              typescript: '4.1.3',
            },
            scripts: {
              start: 'kkt start',
              build: 'kkt build',
              test: 'kkt test --env=jsdom',
            },
            browserslist: ['>0.2%', 'not dead', 'not ie <= 11', 'not op_mini all'],
          },
        },
      },
    },
    codeSandboxShow: true,
    codePenShow: true,
    codePen: {
      includeModule: ['uiw'],
      title: 'React Code Preview - demo',
      html: '<div id="root"></div>',
      js: code.replace('_mount_', 'document.getElementById("root")'),
      css_external: 'https://unpkg.com/uiw@3.2.6/dist/uiw.min.css',
      js_external: `https://unpkg.com/react@16.x/umd/react.development.js;https://unpkg.com/react-dom@16.x/umd/react-dom.development.js;https://unpkg.com/uiw@4.7.2/dist/uiw.min.js;https://unpkg.com/@uiw/codepen-require-polyfill@1.0.12/index.js`,
    },
  });
  function handleChange(keyName: string, e: React.ChangeEvent<HTMLInputElement>) {
    const newstate = { ...state, [`${keyName}`]: e.target.checked };
    setState({ ...newstate });
  }

  useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-color-mode') === 'dark' ? 'dark' : 'light');
    document.addEventListener('colorschemechange', (e: any) => {
      setTheme(e.detail.colorScheme);
    });
  }, []);

  return (
    <Fragment>
      <CodePreview
        code={code}
        theme={theme}
        dependencies={{ ...UIW }}
        bordered={state.bordered}
        noScroll={state.noScroll}
        bgWhite={state.bgWhite}
        noCode={state.noCode}
        editProps={{
          onChange: (value) => {
            setState({
              ...state,
              codeSandbox: {
                ...state.codeSandbox,
                files: {
                  ...state.codeSandbox.files,
                  'src/index.js': {
                    content: value,
                  },
                },
              },
              codePen: {
                ...state.codePen,
                js: value,
              },
            });
          },
        }}
        noPreview={state.noPreview}
        codeSandboxOption={state.codeSandboxShow ? state.codeSandbox : undefined}
        codePenOption={state.codePenShow ? state.codePen : undefined}
      />
      <div>
        <Switch
          data-checked="格纹"
          data-unchecked="白色"
          checked={state.bgWhite}
          onChange={handleChange.bind(this, 'bgWhite')}
        >
          背景 `bgWhite={state.bgWhite.toString()}`
        </Switch>
        <br />
        <Switch
          data-checked="显示"
          data-unchecked="隐藏"
          checked={state.noCode}
          onChange={handleChange.bind(this, 'noCode')}
        >
          是否显示代码 `noCode={state.noCode.toString()}`
        </Switch>
        <br />
        <Switch
          data-checked="显示"
          data-unchecked="隐藏"
          checked={state.noPreview}
          onChange={handleChange.bind(this, 'noPreview')}
        >
          是否显示实例预览 `noPreview={state.noPreview.toString()}`
        </Switch>
        <br />
        <Switch
          data-checked="超出滚动"
          data-unchecked="高度自适应"
          checked={state.noScroll}
          onChange={handleChange.bind(this, 'noScroll')}
        >
          是否显示滚动条 `noScroll={state.noScroll.toString()}`
        </Switch>
        <br />
        <Switch checked={state.bordered} onChange={handleChange.bind(this, 'bordered')}>
          是否显示边框 `bordered={state.bordered.toString()}`
        </Switch>
        <br />
        <Switch checked={state.codePenShow} onChange={handleChange.bind(this, 'codePenShow')}>
          是否显示 CodePen 按钮 `codePenOption={state.codePenShow ? '{...}' : 'undefined'}`
        </Switch>
        <br />
        <Switch checked={state.codeSandboxShow} onChange={handleChange.bind(this, 'codeSandboxShow')}>
          是否显示 CodeSandbox 按钮 `codeSandboxOption={state.codeSandboxShow ? '{...}' : 'undefined'}`
        </Switch>
      </div>
    </Fragment>
  );
};

export default Example;
