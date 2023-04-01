import filterTemplatePipe from './template/filter.js'
import listenerPipe from './template/listener.js'
import functionalPipe from './template/functional.js'
import vModelTemplatePipe from './template/v-model.js'
import vForPipe from './template/v-for.js'
import filterScriptPipe from './script/filter.js'
import spfScriptPipe from './script/spf.js'
import compExtPipe from './script/comp-ext.js'
import vModelScriptPipe from './script/v-model.js'
import dynamicImport from './script/dynamicImport.js'
export default (item) => {
  if (item.ext === 'vue') {
    const template = item.value.match(/<template[\s]*(functional)?[\s]*>[\s\S]*<\/template>/gm)
    if (template && template[0]) {
      vForPipe(template[0], item)
      filterTemplatePipe(template[0], item)
      listenerPipe(template[0], item)
      functionalPipe(template[0], item)
      vModelTemplatePipe(template[0], item)
    }
    const script = item.value.match(/<script>([\s\S]*)<\/script>/gm)
    if (script && script[0]) {
      spfScriptPipe(script[0], item)
      dynamicImport(script[0], item)
      filterScriptPipe(script[0], item)
      compExtPipe(script[0], item)
      vModelScriptPipe(script[0], item)
    }
    if (item.bundle.length) {
      console.log(item.bundle)
    }
  }
}