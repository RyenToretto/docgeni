import * as yargs from 'yargs';
import { buildCommand } from './build';
import { serveCommand } from './serve';
import { getConfiguration } from './configuration';
import { DEFAULT_CONFIG } from '@docgeni/core';

const argv = yargs
    .scriptName('docgeni')
    .usage('Usage: $0 <build|dev> [options]')
    .option('docs-path', {
        desc: `Docs folder path`,
        default: DEFAULT_CONFIG.docsPath
    })
    .option('siteProjectName', {
        desc: `Site project name`,
        default: ''
    })
    .command(buildCommand)
    .command(serveCommand)
    .demandCommand(1, 'must provide a valid command')
    .detectLocale(false)
    .wrap(120)
    .version()
    .showHelpOnFail(false)
    .pkgConf('wpm')
    .config(getConfiguration())
    .help().argv;

const command = argv._[0] as string;

if (!['build', 'dev', 'serve'].includes(command)) {
    yargs.showHelp();
}
