import { Bundle } from "../../../utils/index.js"
export default (template, item) => {
  const target = template.match(/<.+v-for.+?>/gm)
  if (target) {
    target.forEach(each => {
      const target1 = each.match(/<.+v-if.+?>/gm)
      if (target1) {
        target1.forEach(each1 => {
          item.bundle.push(new Bundle(each1, each1.replace('v-for', 'DIRECTIVE_NEED_FOR_CHANGE')))
        })
      }
    })
  }
}