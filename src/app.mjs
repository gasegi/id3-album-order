// import fs from 'fs-extra';

import DirUtil from './domain/dir.mjs';
import MetaUtil from './domain/meta.mjs';

const dirPath = 'D:\\PlayMusic';

async function main() {
  console.log('[main] start', new Date().toISOString());
  const list = await DirUtil.list(dirPath);
  console.log('[main] DirUtil.list end', new Date().toISOString());

  const musicList = await MetaUtil.getMeta(dirPath, list);
  // const musicList = JSON.parse(await fs.readFile('musicListPlayMusic.json'));
  console.log('[main] MetaUtil.getMeta end', new Date().toISOString());
  // await fs.writeFile('musicList.json',JSON.stringify(musicList));
  // console.log('[main] musicList.json end' , new Date().toISOString());

  // 駄目文字対応
  for (const musicMeta of musicList) {
    if (typeof musicMeta.album === 'string') {
      musicMeta.album = DirUtil.replaceProhibitChars(musicMeta.album);
    }
  }

  const artistList = {};
  console.log('musicMeta.artist');
  for (const musicMeta of musicList) {
    const v = artistList[musicMeta.album];
    if (typeof v == 'number') {
      artistList[musicMeta.album]++;
    } else {
      artistList[musicMeta.album] = 1;
    }
  }
  console.log('[main] musicMeta.artist end', new Date().toISOString());

  await DirUtil.createDir(artistList, dirPath);
  console.log('[main] DirUtil.createDir end', new Date().toISOString());

  await DirUtil.moveFile(musicList, artistList, dirPath);
  console.log('[main] end', new Date().toISOString());
  console.log(artistList);
}

main();
