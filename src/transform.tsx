import { transform } from '@babel/standalone';
import RemoveImports from 'babel-plugin-transform-remove-imports';

export async function BabelTransform(input: string) {
  const specifiers: any[] = [];
  const code = transform(input, {
    presets: ['es2015', 'react'],
    plugins: [
      [RemoveImports, { removeAll: true }],
    ],
  }).code;

  return { code, specifiers };
}
