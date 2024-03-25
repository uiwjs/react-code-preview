import React from 'react';
import TestRenderer from 'react-test-renderer';
import CodePreview from '../';

describe('<CodePreview />', () => {
  it('Should output a CodePreview', () => {
    const component = TestRenderer.create(<CodePreview />);
    let tree = component.toJSON();
    if (tree && !Array.isArray(tree)) {
      /* eslint-disable jest/no-conditional-expect */
      expect(tree.type).toEqual('div');
      expect(tree.props.className).toEqual('w-split w-code-preview w-code-preview-bordered w-split-horizontal');
      expect(tree.props.style).toEqual({
        flex: 1,
      });
      expect(tree.children!.length).toEqual(3);
    }
  });
});
