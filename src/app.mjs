import DirUtil from './domain/dir.mjs';
import MetaUtil from './domain/meta.mjs';

const dirPath = 'D:\\PlayMusic2';

async function main() {
  const list = await DirUtil.list(dirPath);

  const musicList = await MetaUtil.getMeta(dirPath, list);
  
  console.log('musicMeta.artist');
  for (const musicMeta of musicList) {
    console.log(musicMeta.album);
  }
}

main();
