import path from 'path';
import webpack, {Configuration} from 'webpack';
import { LoaderConfOptions } from 'kkt';
import lessModules from '@kkt/less-modules';
import rawModules from '@kkt/raw-modules';
import scopePluginOptions from '@kkt/scope-plugin-options';
import pkg from './package.json';
import nodeExternals from 'webpack-node-externals';

export default (conf: Configuration, env: 'production' | 'development', options: LoaderConfOptions) => {
  conf = rawModules(conf, env, { ...options });
  conf = lessModules(conf, env, options);
  conf = scopePluginOptions(conf, env, {
    ...options,
    allowedFiles: [
      path.resolve(process.cwd(), 'README.md'),
      path.resolve(process.cwd(), 'src'),
    ]
  });
  // Get the project version.
  conf.plugins!.push(new webpack.DefinePlugin({
    VERSION: JSON.stringify(pkg.version),
  }));

  conf.optimization = {
    ...conf.optimization,
    splitChunks: {
      chunks: 'all', // async对异步引入的代码分割 initial 对同步引入代码分割 all对同步异步引入的分割都开启
      minSize: 30000, // 字节 引入的文件大于30kb才进行分割
      maxSize: 0, // 文件的最大尺寸，优先级：maxInitialRequest/maxAsyncRequests < maxSize < minSize，需要注意的是这个如果配置了，umi.js 就可能被拆开，最后构建出来的 chunkMap 中可能就找不到 umi.js 了
      minChunks: 1, // 模块至少使用次数
      maxAsyncRequests: 30, // 同时加载的模块数量最多是_个，只分割出同时引入的前_个文件（按需加载模块）
      maxInitialRequests: 25, // 首页加载的时候引入的文件最多 _ 个（加载初始页面）
      automaticNameDelimiter: '~', // 缓存组和生成文件名称之间的连接符
      name: true, // 缓存组里面的 filename 生效，覆盖默认命名
      cacheGroups: {
        markdown_preview: {
          name: 'vendors-markdown-preview',
          chunks: 'all',
          test: /[\\/]node_modules[\\/](@uiw\/react-markdown-preview|codemirror)[\\/]/,
          priority: -2,
        },
        uiwjs: {
          name: 'vendors-uiwjs',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]@uiw\/(copy-to-clipboard|formatter|icons|react-affix|react-alert|react-avatar|react-back-top|react-badge|react-breadcrumb|react-button|react-button-group|react-calendar|react-card|react-checkbox|react-codemirror|react-collapse|react-copy-to-clipboard|react-date-input|react-date-picker|react-descriptions|react-divider|react-drawer|react-dropdown|react-file-input|react-form|react-github-corners|react-grid|react-icon|react-input|react-layout|react-list|react-loader|react-menu|react-message|react-modal|react-month-picker|react-notify|react-overlay|react-overlay-trigger|react-pagination|react-pin-code|react-popover|react-portal|react-progress|react-radio|react-rate|react-search-select|react-select|react-slider|react-split|react-steps|react-switch|react-table|react-tabs|react-tag|react-textarea|react-time-picker|react-tooltip|react-tree|react-tree-checked|reset.css|utils)[\\/]/,
          priority: -4, // 优先级，先打包到哪个组里面，值越大，优先级越高
        },
        react: {
          name: 'vendors-react',
          chunks: 'all',
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          priority: -5,
        },
        babel_standalone: {
          name: 'vendors-standalone',
          chunks: 'all',
          test: /[\\/]node_modules[\\/](@babel\/standalone)[\\/]/,
          priority: -5,
        },
        prismjs: {
          test: /[\\/]node_modules[\\/](prismjs)[\\/]/,
          name: 'prismjs-vendor',
          chunks: 'async',
        },
        babel_runtime: {
          name: 'vendors-runtime',
          chunks: 'all',
          test: /[\\/]node_modules[\\/](@babel\/runtime|@babel\/plugin-transform-classes|babel-plugin-transform-remove-imports)[\\/]/,
          priority: -5,
        },
      }
    }
  }

  if (env === 'production') {
    conf.output = { ...conf.output, publicPath: './' };
  }
  conf.externals = [
    nodeExternals()
  ]
  return conf;
}
