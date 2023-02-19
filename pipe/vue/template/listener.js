export default (template, item) => {
  const listeners = template.match(/v-on="[\s]*\$listeners[\s]*"/g)
  if (listeners) {
    listeners.forEach(each => {
      item.value = item.value.replaceAll(each, 'v-bind="$attrs"')
    })
    item.value = item.value.replace(/export default[\s]*{/, 
`export default {
  inheritAttrs: false,`)
    // console.log(item.value)
  }
}