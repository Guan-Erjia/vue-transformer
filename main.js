import fs from 'fs'
import config from './config.js'
import pipe from './pipe/index.js'

const getfiles = (path) => {    //读取目录下所有目录文件  返回数组
  return fs.readdirSync(path, { encoding: 'utf-8', withFileTypes: true })
}

const isFile = (filepath, item) => {  //判断是否是文件 Boolean
  let stat = fs.statSync(filepath + '/' + item.name)
  return stat.isFile()
}

const isDir = (filepath, item) => {  //判断是否是文件夹 Boolean
  let stat = fs.statSync(filepath + '/' + item.name)
  return stat.isDirectory()
}

const mkFileInfo = (path, item) => {
  if (isDir(path, item)) { //如果是文件夹
    getAllfiles(path + '/' + item.name)
    return { name: item.name, type: 'dir', path: path + '/' + item.name }
  } else if (isFile(path, item)) {
    return { name: item.name, type: 'file', path: path + '/' + item.name, ext: item.name.split('.').pop() }
  } else {
    return
  }
}


//递归遍历所有文件夹和文件
let time = 0
const getAllfiles = (path) => { 	// 结果将存储到arr数组中
  let filesArr = getfiles(path);     // 获取目录下所有文件
  filesArr.forEach(item => {
    time++
    if (!config.exclude.includes(item.name)) {
      const fileInfo = mkFileInfo(path, item)
      if (fileInfo) {
        pipe(fileInfo)
      }
    }
  })
}

// getAllfiles('D:/workplace1/ssr/mobile/components/common/product')
getAllfiles('D:/workplace1/ssr/mobile/components')