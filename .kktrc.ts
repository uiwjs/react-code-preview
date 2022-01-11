import path from 'path';
import webpack, { Configuration } from 'webpack';
import { LoaderConfOptions } from 'kkt';
import lessModules from '@kkt/less-modules';
import rawModules from '@kkt/raw-modules';
import scopePluginOptions from '@kkt/scope-plugin-options';
import pkg from './package.json';

export default (conf: Configuration, env: 'production' | 'development', options: LoaderConfOptions) => {
  conf.module!.exprContextCritical = false;
  conf = rawModules(conf, env, { ...options });
  conf = lessModules(conf, env, options);
  conf = scopePluginOptions(conf, env, {
    ...options,
    allowedFiles: [path.resolve(process.cwd(), 'README.md'), path.resolve(process.cwd(), 'src')],
  });
  // Get the project version.
  conf.plugins!.push(
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(pkg.version),
    }),
  );

  if (env === 'production') {
    conf.optimization = {
      ...conf.optimization,
      splitChunks: {
        chunks: 'all', // async对异步引入的代码分割 initial 对同步引入代码分割 all对同步异步引入的分割都开启
        minSize: 30000, // 字节 引入的文件大于30kb才进行分割
        minChunks: 1, // 模块至少使用次数
        maxAsyncRequests: 30, // 同时加载的模块数量最多是_个，只分割出同时引入的前_个文件（按需加载模块）
        maxInitialRequests: 25, // 首页加载的时候引入的文件最多 _ 个（加载初始页面）
        automaticNameDelimiter: '~', // 缓存组和生成文件名称之间的连接符
        cacheGroups: {
          codemirror: {
            name: 'codemirror-vendors',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](@codemirror)[\\/]/,
            priority: -2,
          },
          refractor: {
            name: 'refractor-vendors',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](refractor)[\\/]/,
            priority: -2,
          },
          uiwjs: {
            name: 'uiwjs-vendors',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]@uiw[\\/]/,
            priority: -4, // 优先级，先打包到哪个组里面，值越大，优先级越高
          },
          react: {
            name: 'react-vendors',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            priority: -5,
          },
          babel_standalone: {
            name: 'standalone-vendors',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](@babel\/standalone)[\\/]/,
            priority: -2,
          },
          babel_vendors: {
            name: 'babel_vendors',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](@babel)[\\/]/,
          },
          prismjs: {
            test: /[\\/]node_modules[\\/](prismjs)[\\/]/,
            name: 'prismjs-vendor',
            chunks: 'all',
          },
          babel_runtime: {
            name: 'vendors-runtime',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](@babel|babel-plugin-transform-remove-imports)[\\/]/,
            priority: -5,
          },
        },
      },
    };
    conf.output = { ...conf.output, publicPath: './' };
  }

  return conf;
};
