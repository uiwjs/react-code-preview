/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare module '@babel/plugin-transform-classes' {
  export default function _default(url: any, options: any): any;
}

declare module '@babel/standalone' {
  export default function _default(url: any, options: any): any;
  export type Transform = (code: string, options: { [key: string]: any }) => any;
  export const transform: Transform;
}
