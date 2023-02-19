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