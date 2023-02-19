import { getOptionString, trimOption } from '../../../utils/index.js'
class Bundle {
  constructor(pre, rep) {
    this.pre = pre
    this.rep = rep
  }
}
export default (script, item) => {
  const componentsString = getOptionString(script, 'components')
  if (componentsString?.trim()) {
    item.value = item.value.replace(componentsString, '') //字符串获取完毕，先干掉过滤器
    let components = trimOption(componentsString).split(',')
    // console.log(components.map(item => item.trim()))
    const imports = script.match(/import\s.+\sfrom[\s]+['|"].+['|"]/g)
    if (imports.length) {
      const vueImports = imports.filter(each => {
        return components.some(each1 => each.includes(each1))
      }).filter(each => {
        return !(each.endsWith('.vue"') || each.endsWith(".vue'"))
      })
      const bundles = vueImports.map(vueImport => {
        return new Bundle(vueImport,
          vueImport.endsWith('"') ?
            vueImport.slice(0, vueImport.length - 1) + '.vue"' : vueImport.slice(0, vueImport.length - 1) + ".vue'")
      })
      bundles.forEach(each => {
        item.value = item.value.replaceAll(each.pre, each.rep)
      })
      console.log(bundles)
    }
  }
}