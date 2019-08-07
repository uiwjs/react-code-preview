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
            // https://babeljs.io/docs/en/babel-types#importspecifier
            ImportSpecifier(local: any) {
              if (local.parent && local.parent.source && local.parent.source.extra.rawValue) {
                if (local.parent.specifiers) {
                  local.parent.specifiers.forEach((item: any) => {
                    specifiers.push(item.imported.name);
                  });
                }
                local.parentPath.remove();
              }
            },
          },
        };
      },
    ],
  }).code;

  return { code, specifiers };
}
