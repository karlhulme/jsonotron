import { create } from 'handlebars'
import { Template } from 'jsonotron-interfaces'
import {
  hasLabel, hasLabelValue, hasNotLabel, hasNotLabelValue,
  identToConstCase, identToPascalCase, 
  identToSnakeCase, isExcluded, isIncluded, isNotTagged, isTagged,
  labelValue,
  stringify, stringifyPretty, valueToConstCase, valueToIdent
} from '../helpers'
import { TemplateProcessorContext } from './TemplateProcessorContext'
import { TemplateProcessorFunc } from './TemplateProcessorFunc'

/**
 * Returns a function that can convert a template processing context
 * into a rendered string.
 * @param template A langauge or framework template.
 */
export function createTemplateProcessor (template: Template): TemplateProcessorFunc {
  const handlebars = create()

  template.partials?.forEach(partial => {
    handlebars.registerPartial(partial.name, partial.content)
  })

  handlebars.registerHelper('hasLabel', hasLabel)
  handlebars.registerHelper('hasLabelValue', hasLabelValue)
  handlebars.registerHelper('hasNotLabel', hasNotLabel)
  handlebars.registerHelper('hasNotLabelValue', hasNotLabelValue)
  handlebars.registerHelper('identToConstCase', identToConstCase)
  handlebars.registerHelper('identToPascalCase', identToPascalCase)
  handlebars.registerHelper('identToSnakeCase', identToSnakeCase)
  handlebars.registerHelper('isIncluded', isIncluded)
  handlebars.registerHelper('isExcluded', isExcluded)
  handlebars.registerHelper('isNotTagged', isNotTagged)
  handlebars.registerHelper('isTagged', isTagged)
  handlebars.registerHelper('labelValue', labelValue)
  handlebars.registerHelper('stringify', stringify)
  handlebars.registerHelper('stringifyPretty', stringifyPretty)
  handlebars.registerHelper('valueToConstCase', valueToConstCase)
  handlebars.registerHelper('valueToIdent', valueToIdent)

  const generator = handlebars.compile(template.content, { noEscape: true })
  
  return (context: TemplateProcessorContext) => generator(context)
}
