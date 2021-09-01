const readFileList = require("../build.js");

module.exports = {
	'/guides/HTML': [
		{
			title: 'HTML基础',
			collapsable: false,
			children: readFileList('HTML/post')
		}
	],
	'/guides/JavaScript': [
		{
			title: '基础篇',
			collapsable: false,
			children: readFileList('JavaScript/2021-08-27')
		},
		{
			title: '内置模块',
			collapsable: false,
			children: readFileList('JavaScript/2021-08-28')
		},
	]
}
