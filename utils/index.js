import fs from 'fs'
export const getFiles = (path) => {    //读取目录下所有目录文件  返回数组
  return fs.readdirSync(path, { encoding: 'utf-8', withFileTypes: true })
}

export const isFile = (filepath, item) => {  //判断是否是文件 Boolean
  let stat = fs.statSync(filepath + '/' + item.name)
  return stat.isFile()
}

export const isDir = (filepath, item) => {  //判断是否是文件夹 Boolean
  let stat = fs.statSync(filepath + '/' + item.name)
  return stat.isDirectory()
}

export const outPut = (text, item) => {
  const arr = item.path.split('/')
  const pathStr = arr.slice(arr.length - 3, arr.length).join('/')
  return `${text}${pathStr}`
}

const getOption = (rawString) => { //获取配置部分字符串，包括括号
  if (rawString) {
    let option = ''
    let left = 0
    let right = 0
    for (let i = 0; i < rawString[0].length; i++) {
      let currentChar = rawString[0][i]
      option += currentChar
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
    return option
  }
}

export const getOptionString = (script, option) => {
  const model = script.match(/export default([\s\S]*)}/gm)
  if (model) {
    let script = model[0].replace('export default', '')
    let rawString
    switch (option) {
      case 'filters':
        rawString = script.match(/filters[\s\S]*}$/)
        break;
      case 'methods':
        rawString = script.match(/methods[\s\S]*}$/)
        break;
      case 'components':
        rawString = script.match(/components[\s\S]*}$/)
        break;
      case 'props':
        rawString = script.match(/props[\s\S]*}$/)
        break;
      default:
        break;
    }
    const optionString = getOption(rawString)
    return optionString
  }
}

export const trimOption = (optionString) => { //处理为方法文本
  let trimString = optionString
  while (trimString[trimString.length - 1] !== '}') {
    trimString = trimString.slice(0, trimString.length - 1)
  }
  while (trimString[0] !== '{') {
    trimString = trimString.slice(1, trimString.length)
  }
  trimString = trimString.slice(1, trimString.length - 1)
  return trimString
}