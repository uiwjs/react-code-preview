import { transform } from '@babel/standalone';

export async function BabelTransform(input: string) {
  const specifiers: any[] = [];
  const code = transform(input, {
    presets: ['es2015', 'react'],
    plugins: [
      () => {
        return {
          name: 'transform-remove-all-import',
          visitor: {
            /**
             * https://babeljs.io/docs/en/babel-types#importdeclaration
             * @param specifiers
             * @param source 
             */
            ImportDeclaration(specifiers: any, source: string) {
              specifiers.remove();
            },
          },
        };
      },
    ],
  }).code;

  return { code, specifiers };
}
