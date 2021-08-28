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
					'front-end/JavaScript/2021-08-27/browser',
					'front-end/JavaScript/2021-08-27/HTML',
					'front-end/JavaScript/2021-08-27/CSS',
					'front-end/JavaScript/2021-08-27/JavaScript',
					'front-end/JavaScript/2021-08-27/Ajax',
					'front-end/JavaScript/2021-08-27/layout',
					'front-end/JavaScript/2021-08-27/BFC',
					'front-end/JavaScript/2021-08-27/HTTP',
					'front-end/JavaScript/2021-08-27/SEO',
					'front-end/JavaScript/2021-08-27/cross-domain',
					'front-end/JavaScript/2021-08-27/data-structure',
					'front-end/JavaScript/2021-08-27/DOM',
					'front-end/JavaScript/2021-08-27/localStorage',
					'front-end/JavaScript/2021-08-28/8934234235',
					'front-end/JavaScript/2021-08-28/8934263254',
					'front-end/JavaScript/2021-08-28/3223623477',
					'front-end/JavaScript/2021-08-28/1456829450',
				]
			},
			{
				title: 'VUE',
				collapsable: false,
				children: [
					'front-end/VUE/2021-08-27/MVVM',
				]
			},
			{
				title: 'Node',
				collapsable: false,
				children: [
					'front-end/Node/2021-08-27/dataBase',
				]
			},
		]
	)
}
