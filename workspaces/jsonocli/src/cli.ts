import * as yargs from 'yargs'
import { clone, codegen } from './commands'

/**
 * Runs the command line tool with the given command line arguments.
 */
function run () {
  // calling `.parse` is the trigger for validating the inputs and executing the commands.
  yargs
    .command(
      'clone <server> <dir>',
      'Clone remote systems to local directory',
      args => {
        yargs.positional('server', { describe: 'Url of server', type: 'string' })
        yargs.positional('dir', { describe: 'A target folder', type: 'string' })
        return args
      },
      async (args: Record<string, unknown>) => { clone(args.server as string, args.dir as string) }
    )
    .command(
      'codegen <server> <path>',
      'Generate code, language picked from extension',
      args => {
        yargs.positional('server', { describe: 'Url of server', type: 'string' })
        yargs.positional('path', { describe: 'A target file', type: 'string' })
        return args
      },
      async (args: Record<string, unknown>) => { codegen(args.server as string, args.path as string) }
    )
    .demandCommand(1)
    .parse()
}

run()
