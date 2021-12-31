import path from 'path';
import webpack, {Configuration} from 'webpack';
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
    allowedFiles: [
      path.resolve(process.cwd(), 'README.md'),
      path.resolve(process.cwd(), 'src'),
    ]
  });
  // Get the project version.
  conf.plugins!.push(new webpack.DefinePlugin({
    VERSION: JSON.stringify(pkg.version),
  }));

  /**
   * https://github.com/kktjs/kkt/issues/198#issuecomment-1003244164
   */
  if (conf.module && conf.module.rules && conf.module.rules[0]) {
    const rules = conf.module.rules[0];
    if (typeof rules === 'object' && typeof rules.loader === 'string' && /source-map-loader/.test(rules.loader)) {
      ;(conf.module.rules[0] as any).exclude = /((@babel(?:\/|\\{1,2})runtime)|codesandbox-import-utils)/;
    }
  }
  
  if (env === 'production') {
    conf.optimization = {
      ...conf.optimization,
      splitChunks: {
        chunks: 'all', // async对异步引入的代码分割 initial 对同步引入代码分割 all对同步异步引入的分割都开启
        minSize: 30000, // 字节 引入的文件大于30kb才进行分割
        // maxSize: 0, // 文件的最大尺寸，优先级：maxInitialRequest/maxAsyncRequests < maxSize < minSize，需要注意的是这个如果配置了，umi.js 就可能被拆开，最后构建出来的 chunkMap 中可能就找不到 umi.js 了
        minChunks: 1, // 模块至少使用次数
        maxAsyncRequests: 30, // 同时加载的模块数量最多是_个，只分割出同时引入的前_个文件（按需加载模块）
        maxInitialRequests: 25, // 首页加载的时候引入的文件最多 _ 个（加载初始页面）
        automaticNameDelimiter: '~', // 缓存组和生成文件名称之间的连接符
        cacheGroups: {
          markdown_preview: {
            name: 'vendors-markdown-preview',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](@uiw\/react-markdown-preview)[\\/]/,
            priority: -2,
          },
          codemirror: {
            name: 'vendors-codemirror',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](@codemirror)[\\/]/,
            priority: -2,
          },
          refractor: {
            name: 'vendors-refractor',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](refractor)[\\/]/,
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
            priority: -2,
          },
          babel_vendors: {
            name: 'babel_vendors',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](@babel)[\\/]/,
            priority: -5,
          },
          prismjs: {
            test: /[\\/]node_modules[\\/](prismjs)[\\/]/,
            name: 'prismjs-vendor',
            chunks: 'all',
          },
          reactmarkdownpreview: {
            test: /[\\/](react-markdown-preview)[\\/]/,
            name: 'markdown-preview-vendor',
            chunks: 'all',
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
    conf.output = { ...conf.output, publicPath: './' };
  }

  return conf;
}
