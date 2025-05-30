/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://smart-todo.vercel.app',
    generateRobotsTxt: true,
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
    },
    changefreq: 'daily',
    priority: 0.7,
  };