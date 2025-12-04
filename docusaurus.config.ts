import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "읽은 도서 정리",
  tagline: "개발 도서를 읽고 정리한 내용을 기록합니다.",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  noIndex: true,
  
  url: "https://wcm-document-2mi.pages.dev",
  
  
  baseUrl: "/",

  
  
  organizationName: "book-notes", // Usually your GitHub org/user name.
  projectName: "book-notes", // Usually your repo name.

  onBrokenLinks: "throw",

  
  i18n: {
    defaultLocale: "ko",
    locales: ["ko"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: "https://github.com/your-username/your-repo",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // editUrl: "https://github.com/your-username/your-repo",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      require.resolve("docusaurus-lunr-search"),
      {
        languages: ["ko", "en"], // 한국어, 영어 지원
        highlightResult: true, 
        maxHits: 8, 
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    // Algolia 설정 제거 (local search 사용 시 불필요)
    navbar: {
      title: "읽은 도서 정리",
      logo: {
        alt: "도서 정리 Logo",
        src: "img/logo.png",
        href: "/docs/intro",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Docs",
        },
      
      ],
    },
    footer: {
      style: "dark",

      copyright: `Copyright © ${new Date().getFullYear()} Book Notes. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
