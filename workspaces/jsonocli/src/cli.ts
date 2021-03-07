import * as yargs from 'yargs'
import { clone, codegen } from './commands'

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

// use clone - to get a copy of the raw resources which can be loaded into jsonotron engine
// use codegen - to create code for working with the type system (based on extension)
// use graphgen - to build a set of graphql types

/**
 * Runs the command line tool with the given command line arguments.
 */
function run () {
  // calling `.parse` is the trigger for validating the inputs and executing the commands.
  yargs
    .command(
      'clone <server> <dir> <systems..>',
      'Clone remote systems to local directory',
      args => {
        yargs.positional('server', { describe: 'Url of server', type: 'string' })
        yargs.positional('dir', { describe: 'A target folder', type: 'string' })
        yargs.positional('systems', { describe: 'An array of qualified system names', type: 'string', array: true })
        return args
      },
      async (args: Record<string, unknown>) => { clone(args.server as string, args.dir as string, args.systems as string[]) }
    )
    .command(
      'codegen <server> <path> <systems..>',
      'Generate code, language picked from extension',
      args => {
        yargs.positional('server', { describe: 'Url of server', type: 'string' })
        yargs.positional('path', { describe: 'A target file', type: 'string' })
        yargs.positional('systems', { describe: 'An array of qualified system names', type: 'string', array: true })
        return args
      },
      async (args: Record<string, unknown>) => { codegen(args.server as string, args.path as string, args.systems as string[]) }
    )
    .demandCommand(1)
    .parse()
}

run()
