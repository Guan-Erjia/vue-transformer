import { Bundle } from "../../../utils/index.js"
export default (template, item) => {
  const target = template.match(/[\@|v\-on:][^\s]+\.native="/g)
  if (target) {
    target.forEach(each => {
      item.bundle.push(new Bundle(each, each.replace('.native', '')))
    })
  }
}