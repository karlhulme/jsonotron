import * as yargs from 'yargs'
import { markdown, typescript } from './commands'

// who needs what...?

// data service
//   needs a clone of the types for run time validation
//   needs a JTYPES object for describing doc types

// logic service
//   needs a clone of the types for run time valiation
//   needs a JTYPES object for describing structures
//   needs enum consts for directing the logic

// graph service
//   needs a set of GraphQL types that represent the jsonotron types
//   needs the docTypes so it can add properties without having to redefine the types??

// front-end
//   needs enum consts for directing the logic
//   needs enum items for populating drop-downs

// use typescript - to retrieve typescript code

/**
 * Runs the command line tool with the given command line arguments.
 */
function run () {
  // calling `.parse` is the trigger for validating the inputs and executing the commands.
  yargs
    .command(
      'markdown <server> <path> <systems..>',
      'Retrieve markdown from jsonotron server',
      args => {
        yargs.positional('server', { describe: 'Url of server', type: 'string' })
        yargs.positional('path', { describe: 'A target file', type: 'string' })
        yargs.positional('systems', { describe: 'An array of system names', type: 'string', array: true })
        return args
      },
      async (args: Record<string, unknown>) => { markdown(args.server as string, args.path as string, args.systems as string[]) }
    )
    .command(
      'typescript <server> <path> <systems..>',
      'Retrieve typescript code from jsonotron server',
      args => {
        yargs.positional('server', { describe: 'Url of server', type: 'string' })
        yargs.positional('path', { describe: 'A target file', type: 'string' })
        yargs.positional('systems', { describe: 'An array of system names', type: 'string', array: true })
        return args
      },
      async (args: Record<string, unknown>) => { typescript(args.server as string, args.path as string, args.systems as string[]) }
    )
    .demandCommand(1)
    .parse()
}

run()
