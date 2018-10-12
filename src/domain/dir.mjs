// import path from 'path';
import fs from 'fs-extra';

// import LogUtil from './log.mjs';

class DirUtil {
  static async list(dirPath) {
    const _dirPath = dirPath;
    if (typeof _dirPath !== 'string') {
      throw new TypeError('dirPath require type of string.');
    }
    const list = await fs.readdir(_dirPath);

    return list;
    // for (const filePath of list) {
    //   const f = await fs.stat(path.resolve(_dirPath, filePath));
    //   if()
    // }
  }
}

export default DirUtil;
