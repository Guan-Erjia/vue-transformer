import { outPut } from '../../../utils/index.js'
class Bundle {
  constructor(pre, rep) {
    this.pre = pre
    this.rep = rep
  }
}

const resolveExpress = (pre, cur) => {
  let expression = ''
  let hasArgs = false
  if (cur.match(/[(].+[)]/)) {
    hasArgs = true
  }
  if (hasArgs) {
    let operation = cur.split('(')[0]
    expression = operation + '(' + pre
    let args = cur.match(/[(](.*?)[)]/)[0].split(',')
    args.forEach(each => {
      let arg = isNaN(each) ? each.slice(1, each.length - 1) : each
      expression = expression + ', ' + arg
    })
  } else {
    let operation = cur
    expression = expression + operation + '(' + pre
  }
  expression += ')'
  return expression
}

const findFilter = (str) => {
  const lines = str.match(/{{.+?}}/gm)
  const bundles = []
  if (lines) {
    lines.forEach(each => {
      if (each.includes('||')) {
        console.log(`过滤器与 '||' 混合写法无法解析 ---- ${each}`)
      } else {
        const block = each.match(/.+[ ]*[^|][|][^|][ ]*.+/m)
        if (block && block[0]) {
          const chainFilters = block[0].trim().slice(2, block.length - 3).split(/[ ]?[|][ ]?/).map(each => each.trim())
          const rep = chainFilters.reduce((pre, cur) => {
            return resolveExpress(pre, cur)
          })
          bundles.push(new Bundle(block[0], `{{ ${rep} }}`))
        }
      }
    })
  }
  return bundles
}

export default (template, item) => {
  const bundles = findFilter(template)
  if (bundles.length) {
    bundles.forEach(each => {
      item.value = item.value.replaceAll(each.pre, each.rep)
    })
    console.log(bundles)
    console.log(outPut('过滤器模板已替换', item))
  }
}