import React, { Component } from 'react';
import ReactMarkdown, { MarkdownAbstractSyntaxTree} from 'react-markdown';
import hljs from 'highlight.js';
import classNames from 'classnames';
import styles from './styles/index.module.less';

hljs.configure({
  tabReplace: '  ', // 2 spaces
  classPrefix: '', // don't append class prefix
});

export interface IMarkdown {
  source?: string;
}

export default class Markdown extends Component<IMarkdown> {
  public mdDom = React.createRef<HTMLDivElement>();
  componentDidMount() {
    if (this.mdDom.current){ 
      const code = this.mdDom.current.getElementsByTagName('code');
      for (let i = 0; i < code.length; i += 1) {
        if (code[i] && /^language/.test(code[i].className) && code[i].parentNode && (code[i].parentNode as HTMLElement).tagName) {
          hljs.highlightBlock(code[i]);
        }
      }
    }
  }
  render() {
    const { source } = this.props;
    return (
      <div ref={this.mdDom}>
        <ReactMarkdown
          className={classNames(styles.markdown, 'markdown')}
          source={source}
          escapeHtml={false}
        />
      </div>
    );
  }
}
