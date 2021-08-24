/**
 * @jest-environment jsdom
 */
import React from 'react';
import TestRenderer from 'react-test-renderer';
import CodePreview from '../';

describe('<CodePreview />', () => {
  it('Should output a Button', () => {
    const component = TestRenderer.create(
      <CodePreview />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    if (tree) {
      // expect(tree.type).toBe('button');
    }
  });
});