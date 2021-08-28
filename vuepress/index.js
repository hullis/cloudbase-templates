const { fs, path } = require('@vuepress/shared-utils')
var exec = require('child_process').exec;

function readFileList(dir, filesList = []) {
	const files = fs.readdirSync(dir);
	console.log(files)
	files.forEach((item, index) => {
		var fullPath = path.join(dir, item);
		// console.log(fullPath)
		const stat = fs.statSync(fullPath);
		if (stat.isDirectory()) {
			// 如果是文件夹
			readFileList(path.join(dir, item), filesList); //递归读取文件
		} else {
			filesList.push(fullPath);
		}
	});
	return filesList;
}
var filesList = readFileList('guides');
// var temp = []

// filesList.forEach((item,index)=>{
// 	temp.push(item.replace(/\\/g, "/"))
// })

var str = JSON.stringify(filesList)
// console.log(str)
// fs.writeFile('./extension.json', str, function(err) {
// 	if (err) {
// 		res.status(500).send('Server is error...')
// 	}
// })
