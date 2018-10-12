import path from 'path';
import id3 from 'node-id3';
// import fs from 'fs-extra';

// import LogUtil from './log.mjs';

function _readMeta(fullPath) {
  return new Promise(function (s, t) {
    id3.read(fullPath, function (err, tags) {
      if (err) {
        t(err);
      } else {
        s(tags);
      }
    });
  });
}

class MetaUtil {
  static getMeta(dirPath, list) {
    const _dirPath = dirPath;
    const _list = list;
    // if (typeof _dirPath !== 'string') {
    //   throw new TypeError('dirPath require type of string.');
    // }

    return Promise.all(_list.map(function (filePath) {
      return _readMeta(path.resolve(_dirPath, filePath)).
        then(function (res) {
          const meta = res;
          const retObj = Object.assign({}, meta);
          retObj.filePath = filePath;
          return retObj;
        });
    }));
  }
}

export default MetaUtil;

