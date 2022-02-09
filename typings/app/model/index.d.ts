// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportIndex = require('../../../app/model/index');

declare module 'egg' {
  interface IModel {
    Index: ReturnType<typeof ExportIndex>;
  }
}
