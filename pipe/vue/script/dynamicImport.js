import { judgClose } from "../../../utils/index.js"
import config from '../../../config.js'
import { Bundle } from '../../../utils/index.js'

const replaceFunc = (str) => {
  let temp = str
  Object.keys(config.alias).forEach(each => {
    const aliasPath = '/src' + config.alias[each].slice(1)
    if (str.includes(each)) {
      temp = temp.replaceAll(each, aliasPath)
    }
  })
  return temp.replace('require', 'dynamicImport')
}
export default (script, item) => {
  const target = item.value.match(/require\(.+\)/gm)
  if (target) {
    const bundles = target.map(each => judgClose(each)).map(each => new Bundle(each, replaceFunc(each)))
    if (bundles.length) {
      item.bundles.push(...bundles)
      console.log(bundles)
    }
  }
}