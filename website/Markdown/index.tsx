import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import classNames from 'classnames';
import CodeBlock from './CodeBlock';
import './styles/default.module.less';
import './styles/index.module.less';

export interface IMarkdown {
  source?: string;
}

export default class Markdown extends Component<IMarkdown> {
  render() {
    const { source } = this.props;
    return (
      <ReactMarkdown
        source={source}
        escapeHtml={false}
        renderers={{ code: CodeBlock }}
        className={classNames('markdown')}
      />
    );
  }
}