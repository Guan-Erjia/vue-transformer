class Bundle {
  constructor(pre, rep) {
    this.pre = pre
    this.rep = rep
  }
}

const resolveExpress = (exp, data) => {
  let expression = ''
  let hasArgs = false
  let operation = ''
  if (exp.match(/[(].+[)]/)) {
    hasArgs = true
  }
  if (hasArgs) {
    let operation = exp.split('(')[0]
    expression = expression + operation + '(' + data
    let args = exp.match(/[(](.*?)[)]/)[0].split(',')
    args.forEach(each => {
      console.log(each)
      let arg = isNaN(each) ? each * 1 : each
      expression = expression + ', ' + arg
    })
  } else {
    operation = exp
    expression = expression + operation + '(' + data
  }
  expression += ')'
  return expression
}

const findFilter = (str) => {
  const lines = str.match(/{{.+?}}/gm)
  const bundles = []
  if (lines) {
    lines?.forEach(item => {
      const block = item.match(/.+[ ]*[^|][|][^|][ ]*.+/)
      if (block) {
        const result = block[0].slice(2, block.length - 3)
        const raw = result.split(/[ ]*[|][ ]*/)
        bundles.push(new Bundle(result, resolveExpress(raw[1], raw[0])))
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
    console.log(`过滤器模板已替换-${item.path.split('/').pop()}`)
  }
}