import { getOptionString } from "../../../utils/index.js";
import { Bundle } from '../../../utils/index.js'

export default (script, item) => {
  const bundles = []
  const props = getOptionString(script, 'props')
  if (props) {
    const valueProp = props.match(/[\s|\S]+value\s*:\s*.*?,/g)
    if (valueProp) {
      valueProp.forEach(each => {
        bundles.push(new Bundle(each, each.replace('value', 'modelValue')))
      })
    }
  }
  const emits = script.match(/\$emit\(['|"]input['|"].*,/g)
  if (emits) {
    emits.forEach(each => {
      const rep = each.replace('input', 'update:modelValue')
      bundles.push(new Bundle(each, rep))
    })
  }
  if (bundles.length) {
    item.bundle.push(...bundles)
  }
}