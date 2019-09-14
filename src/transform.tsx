import { transform } from '@babel/standalone';
import RemoveImports from 'babel-plugin-transform-remove-imports';
import TransformClass from '@babel/plugin-transform-classes';

export async function BabelTransform(input: string) {
  const specifiers: any[] = [];
  const code = transform(input, {
    presets: ['es2015', 'react'],
    plugins: [
      [RemoveImports, { removeAll: true }],
      [TransformClass, { loose: true }],
    ],
  }).code;

  return { code, specifiers };
}
