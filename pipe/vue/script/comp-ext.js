import { getOptionString, trimOption } from '../../../utils/index.js'
import { Bundle } from '../../../utils/index.js'
export default (script, item) => {
  const componentsString = getOptionString(script, 'components')
  if (componentsString?.trim()) {
    item.value = item.value.replace(componentsString, '')
    let components = trimOption(componentsString).split(',').map(item => item.trim())
    const imports = script.match(/import\s.+\sfrom[\s]+['|"].+['|"]/g)
    if (imports) {
      const vueImports = imports.filter(each => { //过滤有效组件引入
        return components.some(each1 => each.includes(each1))
      }).filter(each => {
        return !(each.endsWith('.vue"') || each.endsWith(".vue'")) //过滤需要替换的引入字符串
      })
      const bundles = vueImports.map(vueImport => { //引号判断
        return new Bundle(vueImport,
          vueImport.endsWith('"') ?
            vueImport.slice(0, vueImport.length - 1) + '.vue"' : vueImport.slice(0, vueImport.length - 1) + ".vue'")
      })
      if (bundles.length) {
        item.bundle.push(...bundles)
        console.log(bundles)
      }
    }
  }
}