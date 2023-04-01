import { Bundle } from '../../../utils/index.js'

export default (template, item) => {
  const syncs = template.match(/:\S+?\.sync=".+?"/g)
  if (syncs) {
    syncs.forEach(each => {
      const strList = each.split('.sync')
      const rep = 'v-model' + strList[0] + strList[1]
      item.bundle.push(new Bundle(each, rep))
    })
  }
  const emits = template.match(/\$emit\(['|"]input['|"].*,/g)
  if (emits) {
    emits.forEach(each => {
      const rep = each.replace('input', 'update:modelValue')
      item.bundle.push(new Bundle(each, rep))
    })
  }
}