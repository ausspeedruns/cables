// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');
const lightTheme = themes.github;
const darkTheme = themes.dracula;
const { readFile } = require('fs/promises');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Cables',
  tagline: 'Them techies better check them cables',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://ausspeedruns.github.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/cables/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ausspeedruns', // Usually your GitHub org/user name.
  projectName: 'cables', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/ausspeedruns/cables/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Cables',
        logo: {
          alt: 'Cables',
          src: 'img/AusSpeedruns-Logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tutorial',
          },
          {to: '/docs/audio/', label: 'Audio', position: 'left'},
          {to: '/checklists/', label: 'Checklists', position: 'left'},
          {
            href: 'https://github.com/ausspeedruns/cables',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.ausspeedruns.com/',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/ausspeedruns',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/ausspeedruns/cables',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} AusSpeedruns. Built with Docusaurus.`,
      },
      prism: {
        theme: lightTheme,
        darkTheme: darkTheme,
      },
    }),

  plugins: ['docusaurus-plugin-sass'],
};

module.exports = async function() {
  const file = (await readFile("./schedule.json", { encoding: 'utf-8'}));

  return {
    ...config,
    customFields: {
      ...config.customFields,
      schedule: JSON.parse(file),
    }
  }
};
