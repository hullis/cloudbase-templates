module.exports = {
        title: "我的收藏",
        description: "基于云开发的 VuePress 网站应用示例",
        port: 9027,
        base: '/',
        markdown: {
        lineNumbers: true
    },
    head: [
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
        nav: [
            { text: '笔记', link: '/Note/' },
            { text: '工具', link: '/Tool/' },
        ],
        sidebar: {
            '/Note/': [
                'Js/',
                'Css3/',
                'jQuery/',
                'Vue/',
                'React/',
                'WxApp/',
                'Git/',
                'Project/',
                'Performance/',
                'Serve/',
                'Bugs/',
                'Safe/',
                'Codes/',
            ],
            '/Tool/': [
                ''
            ],
        }
    },
    plugins: [
        '@vuepress/back-to-top',
        '@vuepress/plugin-medium-zoom',
        'image'
    ],
};
