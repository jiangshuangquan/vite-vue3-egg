import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import * as path from 'path';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1644300186468_4101';

  // add your egg config in here
  config.middleware = [];


  config.static = {
    prefix: '/',
    dir: [path.join(appInfo.baseDir, 'dist/')],
  };

  // config.view = {
  //   root: path.join(appInfo.baseDir, 'app/public'),
  //   mapping: {
  //     '.html': 'nunjucks',
  //   },
  // };

  config.assets = {
    publicPath: '/public/',
    devServer: {
      autoPort: true,
      command: 'vite',
      debug: true,
    },
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: '',
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
