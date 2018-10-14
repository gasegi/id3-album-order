import path from 'path';
import fs from 'fs-extra';

import LogUtil from './log.mjs';

class DirUtil {
  static async list(dirPath) {
    const _dirPath = dirPath;
    if (typeof _dirPath !== 'string') {
      throw new TypeError('dirPath require type of string.');
    }
    const list = await fs.readdir(_dirPath);
    const retObj = [];
    for (const filePath of list) {
      const f = await fs.stat(path.resolve(_dirPath, filePath));
      if (f.isFile()) {
        retObj.push(filePath);
      }
    }

    return retObj;
  }
  static createDir(artistList, dirPath) {
    const _artistList = artistList;
    const _dirPath = dirPath;
    const artistKeys = Object.keys(_artistList);

    return Promise.all(artistKeys.map(artistKey => {
      const artistNum = _artistList[artistKey];

      if (typeof artistNum === 'number' &&
        artistKey !== 'undefined' &&
        artistNum > 1) {
        return fs.ensureDir(path.resolve(_dirPath, 'out', artistKey)).
          catch(err => {
            LogUtil.log('[DirUtil.createDirTest] error', err);
            return Promise.resolve();
          });
      } else {
        return Promise.resolve();
      }
    }));
  }
  static replaceProhibitChars(str) {
    return str.replace(/[\\/*?":>?|]/g, '_');
  }
  static moveFile(musicList, artistList, dirPath) {
    const _musicList = musicList;
    const _artistList = artistList;
    const _dirPath = dirPath;
    const artistKeys = Object.keys(_artistList);

    return Promise.all(artistKeys.map(artistKey => {
      const artistNum = _artistList[artistKey];

      if (typeof artistNum === 'number' &&
        artistKey !== 'undefined' &&
        artistNum > 1) {
        return Promise.all(
          _musicList.filter(function (elem) {
            return elem.album === artistKey;
          }).map(function (elem) {
            return fs.move(
              path.resolve(_dirPath, elem.filePath),
              path.resolve(_dirPath, 'out', artistKey, elem.filePath)
            );
          })
        ).
          catch(err => {
            LogUtil.log('[DirUtil.moveFile] error', err);
            return Promise.resolve();
          });
      } else {
        return Promise.resolve();
      }
    }));
  }
}

export default DirUtil;
