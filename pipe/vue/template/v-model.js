class Bundle {
  constructor(pre, rep) {
    this.pre = pre
    this.rep = rep
  }
}

export default (template, item) => {
  // const models = template.match(/v-model=".+?"/g)
  // if (models) {
  //   const bundles = models.map(each => new Bundle(each, each.replace('v-model="', 'v-model:modelValue="')))
  //   bundles.forEach(each => {
  //     item.value = item.value.replaceAll(each.pre, each.rep)
  //   })
  //   console.log(bundles)
  // }
  const syncs = template.match(/:\S+?\.sync=".+?"/g)
  if (syncs) {
    const bundles = syncs.map(each => {
      const strList = each.split('.sync')
      const rep = 'v-model' + strList[0] + strList[1]
      return new Bundle(each, rep)
    })
    bundles.forEach(each => item.value = item.value.replaceAll(each.pre, each.rep))
    // console.log(bundles)
  }
  const emits = item.value.match(/\$emit\(['|"]input['|"].*,/g)
  if (emits) {
    const bundles = emits.map(each => {
      const rep = each.replace('input', 'update:modelValue')
      return new Bundle(each, rep)
    })
    bundles.forEach(each => item.value = item.value.replaceAll(each.pre, each.rep))
    // console.log(bundles)
  }
}