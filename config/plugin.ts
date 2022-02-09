import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  assets: {
    enable: true,
    package: 'egg-view-assets',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize', // ORM 框架
  },
};

export default plugin;
