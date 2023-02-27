import parseHTML from '../../../utils/parse-html.js'

export default (template, item) => {
  const target = template.match(/<.+v-for.+?>/gm)
  if (target) {
    target.forEach(each => parseHTML(template, each))
  }
}