import { execSync } from 'child_process';
import { shell, toolkit } from '@docgeni/toolkit';
import * as path from 'path';
import { expect } from 'chai';

describe('docgeni build', () => {
    it('should build success', async () => {
        const basicFixturePath = path.resolve(__dirname, './fixtures/doc-basic');
        shell.cd(basicFixturePath);
        shell.exec('ts-node --project ../../../tsconfig.json ../../../bin/docgeni build --skip-site');

        const siteSrcPath = path.resolve(basicFixturePath, './_site/src');
        const assetsContentPath = path.resolve(siteSrcPath, './assets/content');
        const navigationsFilePath = path.resolve(assetsContentPath, './navigations-zh-cn.json');
        expect(toolkit.fs.pathExistsSync(siteSrcPath)).equals(true);
        expect(toolkit.fs.pathExistsSync(assetsContentPath)).equals(true);
        expect(toolkit.fs.pathExistsSync(navigationsFilePath)).equals(true);
        const navigations = await toolkit.fs.readFileContent(navigationsFilePath);
        expect(JSON.parse(navigations)).deep.equals({
            navs: [
                {
                    id: 'guide',
                    path: 'guide',
                    channel_path: 'guide',
                    title: 'Guide',
                    items: [
                        {
                            id: 'guide/intro',
                            path: 'guide/intro',
                            channel_path: 'guide',
                            title: 'Intro',
                            items: [
                                {
                                    id: 'intro2',
                                    path: 'guide/intro/intro2',
                                    channel_path: 'guide',
                                    title: 'Intro 2',
                                    order: 1,
                                    contentPath: 'docs/guide/intro/intro2.html'
                                },
                                {
                                    id: 'intro1',
                                    path: 'guide/intro/intro1',
                                    channel_path: 'guide',
                                    title: 'Intro 1',
                                    order: 2,
                                    contentPath: 'docs/guide/intro/intro1.html'
                                }
                            ],
                            order: 1
                        },
                        {
                            id: 'getting-started',
                            path: 'guide/getting-started',
                            channel_path: 'guide',
                            title: '快速开始',
                            order: 2,
                            contentPath: 'docs/guide/getting-started.html'
                        },
                        {
                            id: 'installation',
                            path: 'guide/installation',
                            channel_path: 'guide',
                            title: '安装',
                            order: 2,
                            contentPath: 'docs/guide/installation.html'
                        }
                    ],
                    order: 1
                }
            ],
            docs: [
                {
                    id: 'getting-started',
                    path: 'guide/getting-started',
                    channel_path: 'guide',
                    title: '快速开始',
                    order: 2,
                    contentPath: 'docs/guide/getting-started.html'
                },
                {
                    id: 'installation',
                    path: 'guide/installation',
                    channel_path: 'guide',
                    title: '安装',
                    order: 2,
                    contentPath: 'docs/guide/installation.html'
                },
                {
                    id: 'intro1',
                    path: 'guide/intro/intro1',
                    channel_path: 'guide',
                    title: 'Intro 1',
                    order: 2,
                    contentPath: 'docs/guide/intro/intro1.html'
                },
                {
                    id: 'intro2',
                    path: 'guide/intro/intro2',
                    channel_path: 'guide',
                    title: 'Intro 2',
                    order: 1,
                    contentPath: 'docs/guide/intro/intro2.html'
                }
            ]
        });

        const contentPath = path.resolve(siteSrcPath, './app/content');
        const configTsFilePath = path.resolve(contentPath, './config.ts');
        const exampleLoaderTsFilePath = path.resolve(contentPath, './example-loader.ts');
        const componentExamplesTsFilePath = path.resolve(contentPath, './component-examples.ts');

        expect(toolkit.fs.pathExistsSync(contentPath)).equals(true);
        expect(toolkit.fs.pathExistsSync(configTsFilePath)).equals(true);
        expect(toolkit.fs.pathExistsSync(exampleLoaderTsFilePath)).equals(true);
        expect(toolkit.fs.pathExistsSync(componentExamplesTsFilePath)).equals(true);
    });
});
