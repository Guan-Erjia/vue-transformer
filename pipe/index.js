import fs from 'fs'
import vuePlugin from './vue/index.js'

export default (item) => {
  if (item.type === 'file') {
    item.value = fs.readFileSync(item.path, { encoding: 'utf-8' })
    item.bundle = []
    if (item.ext === 'vue') {
      vuePlugin(item)
      fs.writeFileSync(item.path, item.value)
      // fs.writeFileSync(item.path, item.value)     !!!!!执行前请使用git备份
    }
  } else if (item.type === 'dir') {
  }
}