module.exports = {
    title: '个人学习笔记',
    port: 10010,
    base: '/',
    description: '一个前端工程师的自我修养',
	    markdown: {
        lineNumbers: true
    },
    head: [
        ['meta', { name: 'keywords', content: `web前端个人简历,forguo,wforguo,web前端,个人简历,前端工程师,F2E,前端开发,魏国,一个前端工程师的自我修养` }],
        ['meta', { name: 'description', content: `前端个人简历|F2E|web前端个人简历|一个前端工程师的自我修养|魏国|forguo|wforguo` }],
        ['meta', { name: 'author', content: `魏国,forguo,wforguo,卫国没有周` }],
        ['meta', { name: 'baidu-site-verification', content: `code-bakUos2v8l` }],
        ['meta', { name: 'google-site-verification', content: `9aVJNYlDCl0rCI1akpdSqg9Xwr47KJrVWSXktSsfwKE` }],
        ['link', { rel: 'icon', href: `/imgs/favicon.ico` }],
        ['link', { rel: 'manifest', href: `/manifest.json` }],
        ['script', {}, `
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?2788f1f4f01e060d6d892f4bbd5b74d4";
              var s = document.getElementsByTagName("script")[0];
              s.parentNode.insertBefore(hm, s);
            })();
        `]
    ],
    themeConfig: {
        lastUpdated: '更新日期',
        nav: [
            { text: '笔记', link: '/Note/' },
            { text: '工具', link: '/Tool/' },
            { text: 'CSDN', link: 'https://blog.csdn.net/WEIGUO19951107' },
            { text: 'GitHub', link: 'https://github.com/wforguo' },
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
