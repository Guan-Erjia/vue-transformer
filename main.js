import { isFile, isDir, getFiles } from './utils/index.js'
import config from './config.js'
import pipe from './pipe/index.js'
import fs from 'fs'


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
let log = '\n'
const getAllfiles = (path) => { 	// 结果将存储到arr数组中
  let filesArr = getFiles(path);     // 获取目录下所有文件
  filesArr.forEach(item => {
    time++
    if (!config.exclude.includes(item.name)) {
      const fileInfo = mkFileInfo(path, item)
      if (fileInfo) {
        pipe(fileInfo)
        if (fileInfo.bundle) {
          fileInfo.bundle.forEach(each => {
            log = log + (fileInfo.path + '---' + each.pre + '--->' + each.rep + '\n')
          })
        }
      }
    }
  })
}

getAllfiles(config.base)
fs.writeFileSync('./log.txt', log)
