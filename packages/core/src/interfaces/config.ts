import { Library } from './library';
import { NavigationItem } from './navigation-item';
import { Locale } from './locale';

export interface DocgeniConfig {
    /* Title of documentation, e.g: Docgeni */
    title: string;
    /** Heading of documentation, e.g: Doc Generator, default is same as title */
    heading?: string;
    /* Description of documentation */
    description?: string;
    /* Mode of documentation, full mode contains nav, home page, lite mode only contains menu and doc viewers */
    mode?: 'full' | 'lite';
    /* Base href of documentation, default is / */
    baseHref?: string;
    /* Heads of documentation*/
    heads?: [];
    /* Repo url*/
    repoUrl?: string;
    /* Docs folder */
    docsPath: string;
    /* Angular docs site app path */
    sitePath: string;
    /* Components library folder */
    libs?: Library[];
    /* Output folder */
    output?: string;
    /* Navigations for menu and nav */
    navs?: NavigationItem[];
    /** 覆盖自动生成的导航 */
    navsCover?: boolean;
    /* In silent mode, log messages aren't logged in the console */
    silent?: boolean;
    /** Locales */
    locales?: Locale[];
}

// For Angular Template
export interface DocgeniSiteConfig {
    /* Title of documentation, e.g: Docgeni */
    title: string;
    /** Heading of documentation, e.g: Doc Generator, default is same as title */
    heading?: string;
    /* Description of documentation */
    description?: string;
    /* Mode of documentation, full mode contains nav, home page, lite mode only contains menu and doc viewers */
    mode?: 'full' | 'lite';
    /* Base href of documentation, default is / */
    baseHref?: string;
    /* Heads of documentation*/
    heads?: [];
    /* Repo url*/
    repoUrl?: string;
    /* Navigations for menu and nav */
    navs?: NavigationItem[];
    /** Locales */
    locales?: Locale[];
}
