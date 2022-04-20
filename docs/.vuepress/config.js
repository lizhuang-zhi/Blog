module.exports = {
    // 站点配置
    lang: 'zh-CN',
    title: 'Mr.KLeo的分享网站',
    description: '知行合一',
    base: '/MrKLeoBlog/',

    // 主题和它的配置
    theme: '@vuepress/theme-default',
    themeConfig: {
        // logo: 'https://vuejs.org/images/logo.png',
        home: '/',
        // 顶部导航栏
        navbar: [{
                text: '面经复盘',
                link: '/interview/',
            },
            {
                text: '面试题',
                link: '/knowledge/',
            },
            {
                text: '笔试错题记录',
                link: '/wrongexam/',
            },
            {
                text: '编程书籍资源',
                link: '/books/',
            },
        ],
        repo: 'https://github.com/lizhuang-zhi',
        sidebar: "auto"

    },
}

// '/knowledge/': [{
//     text: 'CSS',
//     collapsible: true,
//     children: ['/knowledge/test.md'],
// },
// {
//     text: 'JavaScript',
//     collapsible: true,
//     children: ['/knowledge/'],
// },
// {
//     text: 'Vue',
//     collapsible: true,
//     // children: ['/knowledge/'],
// },
// {
//     text: '微信小程序',
//     collapsible: true,
//     // children: ['/knowledge/'],
// },
// {
//     text: 'HTTP',
//     collapsible: true,
//     children: ['/reference/bundler/vite.md', '/reference/bundler/webpack.md'],
// },
// {
//     text: 'Webpack',
//     collapsible: true,
//     children: ['/reference/bundler/vite.md', '/reference/bundler/webpack.md'],
// },
// {
//     text: '知识小结',
//     collapsible: true,
//     children: ['/reference/bundler/vite.md', '/reference/bundler/webpack.md'],
// }
// ],