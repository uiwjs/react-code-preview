import React, { Component } from 'react';
import hljs from 'highlight.js';

hljs.configure({
  tabReplace: '  ', // 2 spaces
  classPrefix: '', // don't append class prefix
});

export interface ICodeBlockProps {
  language?: string;
  value?: string;
}

export default class CodeBlock extends Component<ICodeBlockProps> {
  public setRef = React.createRef<HTMLPreElement>();
  componentDidMount() {
    this.highlightCode()
  }

  componentDidUpdate() {
    this.highlightCode()
  }

  highlightCode() {
    if (this.setRef.current) {
      hljs.highlightBlock(this.setRef.current);
    }
  }
  render() {
    return (
      <pre>
        <code ref={this.setRef} className={`language-${this.props.language}`}>
          {this.props.value}
        </code>
      </pre>
    );
  }
}