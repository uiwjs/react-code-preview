import { transform } from '@babel/standalone';
import RemoveImports from 'babel-plugin-transform-remove-imports';

export function babelTransform(input: string) {
  return transform(input, {
    presets: ['env', 'es2015', 'react'],
    plugins: [
      [RemoveImports, { removeAll: true }],
    ],
  });
}
