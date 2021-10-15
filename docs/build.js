
const { resolve } = require('path');
const { existsSync, lstatSync, readdirSync } = require('fs');
const { fs } = require('@vuepress/shared-utils')
function readFileList(dir,fileList = []) {
  const dirPath = resolve(`./docs/guides/${dir}`);
  const isDir = existsSync(dirPath)
  if (!isDir) {
    return fileList;
  }
  const files = readdirSync(dirPath);
  files.forEach((item) => {
		var path = resolve(`./docs/guides/${dir}/${item}`);
		var state = fs.lstatSync(path);
		if(state.isDirectory()){
			// 文件夹
			readFileList(`${dir}/${item}`,fileList);
		}else{
			// 文件
			fileList.push(
				`${dir}/${item}`
			);
		}
  });
  return fileList;
}
module.exports = readFileList;
