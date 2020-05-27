import { NavigationItem, Locale } from './interfaces';
import * as path from 'path';
import { DocType } from './enums';
import { DocSourceFile } from './docgeni.interface';
import { toolkit } from '@docgeni/toolkit';
import * as Prism from 'node-prismjs';
export const DOCS_ENTRY_FILE_NAMES = ['index', 'readme'];

type ExtractLocaleItem<T> = T extends {
    locales?: {
        [key: string]: infer TPart;
    };
}
    ? TPart
    : never;

export function getItemLocaleProperty<
    T extends { locales?: { [key: string]: ExtractLocaleItem<T> } },
    TProperty extends keyof ExtractLocaleItem<T>
>(item: T, locale: string, property: TProperty): ExtractLocaleItem<T>[TProperty] {
    if (item.locales && item.locales[locale] && item.locales[locale][property]) {
        return item.locales[locale][property];
    } else {
        return (item as any)[property];
    }
}

export function buildNavsForLocale(locale: Locale, navs: NavigationItem[]): NavigationItem[] {
    return (navs || []).map(rawNav => {
        const nav: NavigationItem = {
            ...rawNav,
            title: getItemLocaleProperty(rawNav, locale.key, 'title'),
            subtitle: getItemLocaleProperty(rawNav, locale.key, 'subtitle')
        };
        if (rawNav.items) {
            nav.items = buildNavsForLocale(locale, rawNav.items);
        }
        delete nav.locales;
        return nav;
    });
}

export function buildNavsMapForLocales(locales: Locale[], navs: NavigationItem[]): Record<string, NavigationItem[]> {
    const localeNavsMap: Record<string, NavigationItem[]> = {};
    locales.forEach(locale => {
        localeNavsMap[locale.key] = buildNavsForLocale(locale, navs);
    });
    return localeNavsMap;
}

export function createDocSourceFile(absDocPath: string, content: string, docType: DocType): DocSourceFile {
    const result = path.parse(absDocPath);
    return {
        absPath: absDocPath,
        content,
        dirname: path.dirname(absDocPath),
        ext: result.ext,
        basename: result.name,
        docType,
        result: null
    };
}

export function getDocRoutePath(metaPath: string, basename: string) {
    if (!toolkit.utils.isUndefinedOrNull(metaPath)) {
        return metaPath;
    }

    const routePath = basename.toLowerCase();
    return isEntryDoc(basename) ? '' : routePath;
}

export function getDocTitle(metaTitle: string, basename: string) {
    if (metaTitle) {
        return metaTitle;
    }
    const title = toolkit.strings.titleCase(basename);
    return title.replace(/-/g, ' ');
}

export function isEntryDoc(basename: string) {
    return DOCS_ENTRY_FILE_NAMES.includes(basename);
}

export function highlight(sourceCode: string, lang: string) {
    const language = Prism.languages[lang] || Prism.languages.autoit;
    return Prism.highlight(sourceCode, language);
}