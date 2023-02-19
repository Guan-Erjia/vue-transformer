import filterTemplatePipe from './filter-template.js'
import filterScriptPipe from './filter-script.js'

export default (item) => {
  if (item.ext === 'vue') {
    const template = item.value.match(/<template>([\s\S]*)<\/template>/gm)
    if (template && template[0]) {
      // filterTemplatePipe(template[0], item)
    }
    const script = item.value.match(/<script>([\s\S]*)<\/script>/gm)
    if (script && script[0]) {
      // filterScriptPipe(script[0], item)
    }
  }
}