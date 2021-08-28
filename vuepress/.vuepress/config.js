const { fs, path } = require('@vuepress/shared-utils')

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
		nav: [{
				text: "首页",
				link: "/"
			},
			{
				text: "指南",
				link: "/guides/"
			},
		],
		editLinks: true,
		editLinkText: '帮助我们改善此页面！',
		locales: {
			'/': {
				editLinkText: '在 GitHub 上编辑此页',
				nav: require('./nav/zh'),
				sidebar: {
					'/guides/': renderSiderBar()
				}
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
    '.vuepress/nav/zh.js',
  ]
});

function renderSiderBar() {
	return (
		[
			{
				title: 'HTML、CSS、JavaScript',
				collapsable: false,
				children: [
					'front-end/JavaScript/browser',
					'front-end/JavaScript/HTML',
					'front-end/JavaScript/CSS',
					'front-end/JavaScript/JavaScript',
					'front-end/JavaScript/Ajax',
					'front-end/JavaScript/layout',
					'front-end/JavaScript/BFC',
					'front-end/JavaScript/HTTP',
					'front-end/JavaScript/SEO',
					'front-end/JavaScript/cross-domain',
					'front-end/JavaScript/data-structure',
					'front-end/JavaScript/DOM',
					'front-end/JavaScript/localStorage',
					'front-end/JavaScript/创建对象和原型链',
					'front-end/JavaScript/面向对象：类的定义和继承的几种方式',
				]
			},
			{
				title: 'VUW',
				collapsable: false,
				children: [
					'front-end/VUE/MVVM',
				]
			},
			{
				title: 'Node',
				collapsable: false,
				children: [
					'front-end/Node/dataBase',
				]
			},
		]
	)
}
