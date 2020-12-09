const sidebar = {
  guide: [
    {
      title: 'Go教程',
      collapsable: false,
      chirldren: [
        '/guide/index'
      ]
    }
  ],
  api: [

  ]
}

module.exports = {
  title: '数据科学参考文档',
  description: 'Code Document (Based on VuePress)',
  locales: {
    '/zh': {
      lang: 'zh-CN'
    },
    '/en': {
      lang: 'en-US'
    }
  },
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/logo.png'
      }
    ]
  ],
  themeConfig: {
    logo: '/static/code.png',
    locales: {
      '/en': {
        label: 'English',
        selectText: 'Languages',
        ariaLabel: 'Select language',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: require('./nav/en'),
        sidebar: {
          '/en/api/': getApiSidebar(),
          '/en/guide/': getGuideSidebar('Guide', 'Advanced'),
   
        }
        
      },
      '/zh': {
        label: '简体中文',
        selectText: '选择语言',
        ariaLabel: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        nav: require('./nav/zh'),
        sidebar: {
          '/zh/api/': getApiSidebar(),
          '/zh/guide/': getGuideSidebar('指南', '深入'),
        }
      }
    },
    repo: 'abelit/abelit-CodeDocs',
    docsDir: 'src',
    sidebarDepth: 2,
    sidebar: {
      collapsable: false,
      '/guide/go/index/': sidebar.go,
      // '/guide/contributing/': sidebar.contributing,
      // '/guide/': sidebar.guide,
      // '/community/': sidebar.guide,
      // '/cookbook/': sidebar.cookbook,
      // '/api/': sidebar.api,
      // '/examples/': sidebar.examples
    },
    smoothScroll: false,
  },
  plugins: [
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: {
          '/': {
            message: '新内容可用',
            buttonText: '刷新'
          }
        }
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'info',
        before: info =>
          `<div class="custom-block info"><p class="custom-block-title">${info}</p>`,
        after: '</div>'
      }
    ]
  ],
  markdown: {
    lineNumbers: true,
    /** @param {import('markdown-it')} md */
    extendMarkdown: md => {
      md.options.highlight = require('./markdown/highlight')(
        md.options.highlight
      )
    }
  }
}