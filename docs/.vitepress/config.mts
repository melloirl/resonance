import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'pt-BR',
  base: '/resonance/',
  title: 'Ressonância',
  head: [['link', { rel: 'icon', href: '/resonance/favicon.ico' }]],
  description: 'Uma introdução às mecânicas básicas do sistema de RPG ressonância.',
  themeConfig: {
    nav: [
      { text: 'Início', link: '/' },
      { text: 'Guia', link: '/guia' },
    ],

    sidebar: [
      {
        text: 'Índice',
        items: [
          { text: 'Guia Básico', link: '/guia' },
          { text: 'A Cidade de Welderhide', link: '/welderhide' },
        ],
      },
    ],

    socialLinks: [{ icon: 'discord', link: 'https://discord.gg/bk8z2xDFHA' }],
    outline: {
      label: 'Nessa página',
    },
    footer: {
      message: 'v0.1',
      copyright: 'Copyright © 2025 <a href="https://discord.com/channels/@me/149655287744167936">Pedro Melo</a>',
    },
  },
  appearance: 'force-dark',
})
