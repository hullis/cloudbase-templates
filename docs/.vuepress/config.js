const { fs, path } = require('@vuepress/shared-utils')
const readFileList = require("../build.js");
module.exports = ctx => ({
	title: "我的收藏",
	description: "基于云开发的 VuePress 网站应用示例",
	base: "/docs/",
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
	themeConfig: {
    repo: 'hullis/cloudbase-templates',
		lastUpdated: 'Last Updated',
		nav: renderNav(),
		sidebar: renderSiderBar(),
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
		[
      'vuepress-plugin-comment',
      {
        choosen: 'valine', 
        // options选项中的所有参数，会传给Valine的配置
        options: {
          el: '#valine-vuepress-comment',
          appId: process.env.LEAN_CLOUD_APPID,
          appKey: process.env.LEAN_CLOUD_APPKEY,
					path: '<%- frontmatter.to.path || window.location.pathname %>'
        }
      }
    ]
	],
  extraWatchFiles: [
    './config.js',
  ]
});
function renderNav() {
	return [
		{
			text: "导航",
			link: "/guides/bookmarks/"
		},
		// {
		// 	text: "指南",
		// 	link: "/guides/Home/"
		// },
		{
			text: "前端",
			items: [
				{
					text: "HTML",
					link: "/guides/HTML/"
				},
				{
					text: "CSS",
					link: "/guides/CSS/"
				},
				{
					text: "JavaScript",
					link: "/guides/JavaScript/"
				},
				{
					text: "小程序",
					link: "/guides/miniProgram/"
				},
				{
					text: "VUE",
					link: "/guides/VUE/"
				},
				{
					text: "Node",
					link: "/guides/Node/"
				},
			]
		},
		{
			text: "笔记",
			link: "/guides/interview/"
		},
		{
			text: "代码片段",
			link: "/guides/codeSnippet/post/main"
		},
	]
}
function renderSiderBar() {
	return (
		{
			'/guides/bookmarks': [
				{
					title: '书签导航',
					collapsable: false,
					children: readFileList('bookmarks/post')
				}
			],
			'/guides/HTML': [
				{
					title: 'HTML基础',
					collapsable: false,
					children: readFileList('HTML/HTML')
				},
				{
					title: 'HTML5',
					collapsable: false,
					children: readFileList('HTML/HTML5')
				}
			],
			'/guides/CSS': [
				{
					title: 'CSS基础',
					collapsable: false,
					children: readFileList('CSS/post/basic')
				}
			],
			'/guides/JavaScript': [
				{
					title: '基础篇',
					collapsable: false,
					children: readFileList('JavaScript/1')
				},
				{
					title: '进阶篇',
					collapsable: false,
					children: readFileList('JavaScript/2')
				},
			],
			'/guides/VUE': [
				{
					title: 'VUE',
					collapsable: false,
					children: readFileList('VUE/post')
				}
			],
			'/guides/Node': [
				{
					title: '基础',
					collapsable: false,
					children: readFileList('Node/base')
				}
			],
			'/guides/interview': [
				{
					title: '面试题',
					collapsable: false,
					children: readFileList('interview/post')
				},
				{
					title: '笔记',
					collapsable: false,
					children: readFileList('interview/note')
				}
			],
			'/guides/codeSnippet': [
				{
					title: '代码片段',
					collapsable: false,
					children: readFileList('codeSnippet/post')
				}
			],
			'/guides/miniProgram': [
				{
					title: '微信小程序',
					collapsable: false,
					children: readFileList('miniProgram/post')
				}
			],
		}
	)
}