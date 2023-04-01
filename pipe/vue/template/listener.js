import { Bundle } from "../../../utils/index.js"
export default (template, item) => {
  const listeners = template.match(/v-on="[\s]*\$listeners[\s]*"/g)
  if (listeners) {
    listeners.forEach(each => {
      item.bundle.push(new Bundle(each, 'v-bind="$attrs"'))
    })
    item.bundle.push(new Bundle(/export default[\s]*{/,
      `export default {
  inheritAttrs: false,`))
    console.log(item.bundle)
  }
}