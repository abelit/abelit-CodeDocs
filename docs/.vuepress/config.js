module.exports =  ctx => ({
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '数据科学参考文档',
      description: '数据科学文档，包括开发、数据分析、数据库、机器学习、深度学习等'
    },
    '/en/': {
      lang: 'en-US',
      title: 'Data Science Document',
      description: 'Code Document (Based on VuePress)'
    }
  },
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/static/logo.png'
      }
    ]
  ],
  themeConfig: {
    logo: '/static/code.png',
    locales: {
      '/': {
        label: '简体中文',
        selectText: '选择语言',
        ariaLabel: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        nav: require('./nav/zh'),
        sidebar: {
          '/api/': getApiSidebar(),
          '/guide/': getGuideSidebar('指南', '深入'),
        }
      },
      '/en/': {
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
        
      }
    },
    repo: 'abelit/abelit-CodeDocs',
    docsDir: 'src',
    sidebarDepth: 2,
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
  extraWatchFiles: [
    '.vuepress/nav/en.js',
    '.vuepress/nav/zh.js'
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
})


function getApiSidebar () {
  return [
    'cli',
    'node'
  ]
}

function getGuideSidebar (groupA, groupB) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '',
        'getting-started',
        'directory-structure',
        'basic-config',
        'assets',
        'markdown',
        'using-vue',
        'i18n',
        'deploy'
      ]
    },
    {
      title: groupB,
      collapsable: false,
      children: [
        'frontmatter',
        'permalinks',
        'markdown-slot',
        'global-computed'
      ]
    }
  ]
}


function getThemeSidebar (groupA, introductionA) {
  return [
    {
      title: groupA,
      collapsable: false,
      sidebarDepth: 2,
      children: [
        ['', introductionA],
        'using-a-theme',
        'writing-a-theme',
        'option-api',
        'default-theme-config',
        'blog-theme',
        'inheritance'
      ]
    }
  ]
}