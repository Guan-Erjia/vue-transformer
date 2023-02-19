import { isFile, isDir,getFiles } from './utils.js/index.js'
import config from './config.js'
import pipe from './pipe/index.js'


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
  let filesArr = getFiles(path);     // 获取目录下所有文件
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