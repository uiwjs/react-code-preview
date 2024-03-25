import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client';
import '@uiw/reset.css/reset.less';
import App from './App';

/**
 * 增加一个❕，解决ts报错的问题
 * 因为 `document.getElementById('root')`有可能为null
 * @see https://github.com/uiwjs/react-code-preview/issues/229
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
