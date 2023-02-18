export default (script, item) => {
  const model = script.match(/export default([\s\S]*)}/gm)
  if (model) {
    let script = model[0].replace('export default', '')
    const rawString = script.match(/filters[\s\S]*}$/)
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
      if (filtersString) {
        item.value = item.value.replace(filtersString, '') //字符串获取完毕，先干掉过滤器
        let methodsString = filtersString
        while (methodsString[methodsString.length - 1] !== '}') {
          methodsString = methodsString.slice(0, methodsString.length - 1)
        }
        while (methodsString[0] !== '{') {
          methodsString = methodsString.slice(1, methodsString.length)
        }
        methodsString = methodsString.slice(1, methodsString.length - 1)
        if (methodsString.trim()) {
          while (methodsString[methodsString.length - 1] !== '}') { //过滤器所有方法字符串
            methodsString = methodsString.slice(0, methodsString.length - 1)
          }
          if (/[,|\s|\S]methods[\s]*:[\s]*{/.test(script)) {
            const result = `methods: {${methodsString},`
            item.value = item.value.replace(/methods[\s]*:[\s]*{/, result)
          } else {
            const result = `
            export default {
              methods: {
                ${methodsString}
              },
              `
            item.value = item.value.replace(/export default[\s]*{/, result)
          }
          console.log(item.value)
        }
      }
    }
  }
}