import { getOptionString, trimOption } from '../../../utils/index.js'
import { Bundle } from '../../../utils/index.js'

export default (script, item) => {
  const filtersString = getOptionString(script, 'filters')
  const bundles = []
  if (filtersString) {
    item.value = item.value.replace(filtersString, '') //字符串获取完毕，先干掉过滤器
    let methodsString = trimOption(filtersString)
    if (methodsString.trim()) {
      while (methodsString[methodsString.length - 1] !== '}') { //过滤器所有方法字符串
        methodsString = methodsString.slice(0, methodsString.length - 1)
      }

      if (/[,|\s|\S]methods[\s]*:[\s]*{/.test(script)) {  //模板内有methods选项
        const result = `methods: {${methodsString},`
        bundles.push(/methods[\s]*:[\s]*{/, result)
      } else {  //模板内无methods选项
        const result = `
            export default {
              methods: {
                ${methodsString}
              },
              `
        bundles.push(/export default[\s]*{/, result)
      }
      console.log(`过滤器已替换为方法-${item.path.split('/').pop()}`)
    }
  }
  if (bundles.length) {
    console.log(bundles)
    item.bundle.push(...bundles)
  }
}