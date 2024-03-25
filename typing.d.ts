/**
 * 增加这个文件是为了解决全局的ts 对 `md|less`后缀的文件引用后ts的报错问题
 * @see bugs(https://github.com/uiwjs/react-code-preview/issues/229)
 */
declare module '*.md';
declare module '*.less';
