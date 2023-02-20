import { getOptionString } from "../../../utils/index.js";
class Bundle {
  constructor(pre, rep) {
    this.pre = pre
    this.rep = rep
  }
}
export default (script, item) => {
  const props = getOptionString(script, 'props')
  if (props) {
    const valueProp = props.match(/[\s|\S]+value\s*:\s*.*?,/g)
    if (valueProp) {
      const bundles = valueProp.map(each => {
        return new Bundle(each, each.replace('value', 'modelValue'))
      })
      bundles.forEach(each => {
        item.value = item.value.replace(each.pre, each.rep)
      })
      console.log(bundles)
    }
  }
  const emits = script.match(/\$emit\(['|"]input['|"].*,/g)
  if (emits) {
    const bundles = emits.map(each => {
      const rep = each.replace('input', 'update:modelValue')
      return new Bundle(each, rep)
    })
    bundles.forEach(each => item.value = item.value.replaceAll(each.pre, each.rep))
    console.log(bundles)
  }
}