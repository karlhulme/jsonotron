import { create } from 'handlebars'
import { identToConstCase, identToPascalCase, identToSnakeCase, valueToConstCase } from '../helpers'
import { TemplateProcessorContext } from './TemplateProcessorContext'
import { TemplateProcessorFunc } from './TemplateProcessorFunc'
import { TemplateProcessorParameters } from './TemplateProcessorParameters'

/**
 * Returns a function that can convert a template processing context
 * into a rendered string.
 * @param params The parameters for the template processing environment.
 */
export function createTemplateProcessor (params: TemplateProcessorParameters): TemplateProcessorFunc {
  const handlebars = create()

  params.partials?.forEach(partial => {
    handlebars.registerPartial(partial.name, partial.content)
  })

  handlebars.registerHelper('identToConstCase', identToConstCase)
  handlebars.registerHelper('identToPascalCase', identToPascalCase)
  handlebars.registerHelper('identToSnakeCase', identToSnakeCase)
  handlebars.registerHelper('valueToConstCase', valueToConstCase)

  const generator = handlebars.compile(params.template, { noEscape: true })
  
  return (context: TemplateProcessorContext) => generator(context)
}


// get the files for the given type (eg markdown or typescript)

// identify the lead file that imports the others

// load the type system

// use the type system as the context to produce a single file

// return the file contents to the caller
