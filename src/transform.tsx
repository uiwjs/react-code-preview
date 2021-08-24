import { transform } from '@babel/standalone';
import RemoveImports from 'babel-plugin-transform-remove-imports';
// @ts-ignore
import TransformClass from '@babel/plugin-transform-classes';

export function BabelTransform(input: string) {
  const specifiers: any[] = [];
  const { code } = transform(input, {
    presets: ['env', 'es2015', 'react'],
    plugins: [
      [RemoveImports, { removeAll: true }],
      [TransformClass, { loose: true }],
    ],
  });

  return { code, specifiers };
}
