const { fs, path } = require('@vuepress/shared-utils')
const readFileList = require("../build.js");
const sidebar = require('./sidebar')
module.exports = ctx => ({
	title: "我的收藏",
	description: "基于云开发的 VuePress 网站应用示例",
	base: "/vuepress/",
  head:[
    ['link', { rel: 'icon', href: `/logo.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style',  }]
  ],
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
	themeConfig: {
    repo: 'hullis/cloudbase-templates',
		lastUpdated: 'Last Updated',
		nav: renderNav(),
		sidebar:sidebar,
		editLinks: true,
		editLinkText: '帮助我们改善此页面！',
		locales: {
			'/': {
				editLinkText: '在 GitHub 上编辑此页',
				// sidebar:{
				// 	'/guides/': renderSiderBar()
				// }
			}
		}
	},
	plugins: [
		['@vuepress/back-to-top', true],
		['@vuepress/pwa', {
			serviceWorker: true,
			updatePopup: true
		}],
		['@vuepress/medium-zoom', true],
		['container', {
			type: 'vue',
			before: '<pre class="vue-container"><code>',
			after: '</code></pre>',
		}],
		['container', {
			type: 'upgrade',
			before: info => `<UpgradePath title="${info}">`,
			after: '</UpgradePath>',
		}],
	],
  extraWatchFiles: [
    '.vuepress/sidebar.js',
  ]
});
function renderNav() {
	return [
		{
			text: "指南",
			link: "/guides/Home/"
		},
		{
			text: "HTML",
			link: "/guides/HTML/"
		},
		{
			text: "JavaScript",
			link: "/guides/JavaScript/"
		},
		{
			text: "Node",
			link: "/guides/Node/"
		},
	]
}
function renderSiderBar() {
	return (
		[
			// {
			// 	title: 'HTML、CSS、JavaScript',
			// 	collapsable: false,
			// 	children: readFileList('JavaScript')
			// },
			// {
			// 	title: 'VUE',
			// 	collapsable: false,
			// 	children: readFileList('VUE')
			// },
			{
				title: '基础篇',
				collapsable: false,
				children: readFileList('Node/base')
			},
			{
				title: '内置模块',
				collapsable: false,
				children: readFileList('Node/modules')
			},
		]
	)
}
