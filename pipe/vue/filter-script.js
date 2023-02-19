const getFilterString = (rawString) => { //获取filter部分字符串，包括括号
  if (rawString) {
    let filtersString = ''
    let left = 0
    let right = 0
    for (let i = 0; i < rawString[0].length; i++) {
      let currentChar = rawString[0][i]
      filtersString += currentChar
      if (currentChar === '{') {
        left++
      }
      if (currentChar === '}') {
        right++
      }
      if (left !== 0 && left === right && (![' ', ',', '\n'].includes(rawString[0][i + 1]))) {
        break
      }
    }
    return filtersString
  }
}

const getMethodsString = (filtersString) => { //处理为方法文本
  let methodsString = filtersString
  while (methodsString[methodsString.length - 1] !== '}') {
    methodsString = methodsString.slice(0, methodsString.length - 1)
  }
  while (methodsString[0] !== '{') {
    methodsString = methodsString.slice(1, methodsString.length)
  }
  methodsString = methodsString.slice(1, methodsString.length - 1)
  return methodsString
}

export default (script, item) => {
  const model = script.match(/export default([\s\S]*)}/gm)
  if (model) {
    let script = model[0].replace('export default', '')
    const rawString = script.match(/filters[\s\S]*}$/)
    const filtersString = getFilterString(rawString)
    if (filtersString) {
      item.value = item.value.replace(filtersString, '') //字符串获取完毕，先干掉过滤器
      let methodsString = getMethodsString(filtersString)
      if (methodsString.trim()) {
        while (methodsString[methodsString.length - 1] !== '}') { //过滤器所有方法字符串
          methodsString = methodsString.slice(0, methodsString.length - 1)
        }
        
        if (/[,|\s|\S]methods[\s]*:[\s]*{/.test(script)) {  //模板内有methods选项
          const result = `methods: {${methodsString},`
          item.value = item.value.replace(/methods[\s]*:[\s]*{/, result)
        } else {  //模板内无methods选项
          const result = `
            export default {
              methods: {
                ${methodsString}
              },
              `
          item.value = item.value.replace(/export default[\s]*{/, result)
        }
        console.log(`过滤器已替换为方法-${item.path.split('/').pop()}`)
      }
    }
  }
}