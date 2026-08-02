// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';

// https://astro.build/config
export default defineConfig({
  site: 'https://alpacode.it',
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  redirects: {
    '/scuola': '/learning/',
    '/en/scuola': '/en/learning/',
  },
  markdown: {
    shikiConfig: {
      theme: 'min-light',
      wrap: true,
    },
    rehypePlugins: [
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: {
            className: ['heading-anchor'],
            ariaLabel: 'Link to this section',
          },
          content: {
            type: 'element',
            tagName: 'span',
            properties: { ariaHidden: 'true' },
            children: [{ type: 'text', value: '#' }],
          },
        },
      ],
    ],
  },
  integrations: [
    react(),
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'it',
        // Bare language codes, matching the <link rel="alternate"> hreflang
        // values in Layout.astro — mixed signals (it vs it-IT) across the two
        // sources make crawlers distrust both.
        locales: { it: 'it', en: 'en' },
      },
      // Pre-launch product pages: noindex'd, so keep them out of the sitemap
      // until launch. Drop these entries when going live.
      filter: (page) =>
        !/\/(hive-commerce|alpacode-pro-kit)\/?$/.test(page),
    }),
  ],
  i18n: {
    locales: ['it', 'en'],
    defaultLocale: 'it',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  // Prefetch internal links on hover and, where supported, upgrade that to a
  // full prerender via the Speculation Rules API (experimental.clientPrerender).
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  experimental: {
    clientPrerender: true,
  },
});
