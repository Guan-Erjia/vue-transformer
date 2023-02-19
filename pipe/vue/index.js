import filterTemplatePipe from './template/filter.js'
import listener from './template/listener.js'
import functional from './template/functional.js'
import vModelTemplate from './template/v-model.js'
import filterScriptPipe from './script/filter.js'
import spfScript from './script/spf.js'
import compExt from './script/comp-ext.js'
import vModelScript from './script/v-model.js'
export default (item) => {
  if (item.ext === 'vue') {
    const template = item.value.match(/<template[\s]*(functional)?[\s]*>[\s\S]*<\/template>/gm)
    if (template && template[0]) {
      // filterTemplatePipe(template[0], item)
      // listener(template[0], item)
      // functional(template[0], item)
      // vModelTemplate(template[0], item)
    }
    const script = item.value.match(/<script>([\s\S]*)<\/script>/gm)
    if (script && script[0]) {
      // spfScript(script[0], item)
      // filterScriptPipe(script[0], item)
      // compExt(script[0], item)
      vModelScript(script[0], item)
    }
  }
}