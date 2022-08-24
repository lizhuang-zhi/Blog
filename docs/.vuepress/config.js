module.exports = {
    // 站点配置
    lang: 'zh-CN',
    title: 'Mr.KLeo的分享网站',
    description: '自我成长之路',
    base: '/blog/',
    head: [
        ['link', {
            rel: 'stylesheet',
            href: './css/index.css'
        }],
    ],
    plugins: [
        [
            '@vuepress/plugin-search',
            {
                // 排除首页
                isSearchable: (page) => page.path !== '/',
                isSearchable: (page) => page.path !== '/wrongexam/',
            },
            {
                locales: {
                    '/': {
                        placeholder: 'Search',
                    },
                    '/zh/': {
                        placeholder: '搜索',
                    },
                },
            },
            ['s', '/']
        ],
    ],

    // 主题和它的配置
    theme: '@vuepress/theme-default',
    themeConfig: {
        // logo: 'https://vuejs.org/images/logo.png',
        home: '/',
        logo: '/images/logo.JPG',
        // 顶部导航栏
        navbar: [
            {
                text: '面经复盘',
                link: '/interview/',
            },
            {
                text: '面试题',
                link: '/knowledge/',
            },
            {
                text: '笔试错题总结',
                link: '/wrongexam/',
            },
            {
                text: '新知巩固',
                link: '/review/',
            },
            {
                text: '编程书籍资源',
                link: '/books/',
            },
            {
                text: '公司项目问题review',
                link: '/problem/',
            },
        ],
        repo: 'https://github.com/lizhuang-zhi',
        sidebar: {
            '/interview/': [{
                text: '复盘面试经历',
                children: [
                    '/interview/main.md'
                ],
            }, ],
            '/knowledge/': [{
                text: '面试题',
                children: [
                    '/knowledge/css.md',
                    '/knowledge/js.md',
                    '/knowledge/http.md',
                    '/knowledge/vue.md',
                    '/knowledge/wxprogram.md',
                    '/knowledge/webpack.md',
                    '/knowledge/algorithm.md',
                    '/knowledge/designmode.md',
                    '/knowledge/summary.md',
                    '/knowledge/answerinput.md',
                    '/knowledge/frontopti.md',
                ],
            }, ],
            '/wrongexam/': [{
                text: '笔试错题总结',
                children: [
                    '/wrongexam/main.md'
                ],
            }, ],
            '/review/': [{
                text: '巩固新知识',
                children: [
                    '/review/main.md'
                ],
            }, ],
            '/books/': [{
                text: '书籍分享',
                children: [
                    '/books/main.md'
                ],
            }, ],
            '/problem/': [{
                text: '公司项目问题review',
                children: [
                    '/problem/main.md'
                ],
            }, ],
        },
        editLink: false,
    },

}